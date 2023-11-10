// addEventListener('load', () => {

	var GravPlugin = GravPlugin || {};
	GravPlugin['adminAddonToastUiEditor'] = Object.assign((GravPlugin.adminAddonToastUiEditor || {}), {

		uploadMedia: (blob, callback) => {
			const formData = new FormData();
			formData.append('file', blob);
			const imgPath = '/' + window.GravAdmin.config.route.concat('/', formData.get('file').name); // WE DON'T REALLY KNOW IF THAT's CORRECT!!

			const request = new XMLHttpRequest();
			const reqURI = window.Grav.default.Pages.Page.Media.PageMediaInstances.urls.add.concat(`/admin-nonce:${window.GravAdmin.config.admin_nonce}`);
			request.open('POST', reqURI, true);
			request.onload = () => {
				callback();
				};
			request.send(formData);
			},

		newEditor: (toastUiId, editorInitialValue, fieldCustomOptions) => {

			const editorDefaultOptions = GravPlugin.adminAddonToastUiEditor.configs.defaults;
			const editorDefaultToolbar = GravPlugin.adminAddonToastUiEditor.configs.toolbar;

			const editorElement = document.getElementById(toastUiId);
			const boundTextarea = editorElement.parentElement.querySelector(`textarea.toastui-shadow[data-bound="${toastUiId}"]`);

			const editorRuntimeOptions = {
				initialValue: editorInitialValue,
				el: editorElement,
				};
			const theseOptions = Object.assign(
				editorDefaultOptions,
				fieldCustomOptions,
				editorRuntimeOptions );

			const thisEditor = toastui.Editor.factory(theseOptions);

			if(typeof thisEditor !== undefined) {

				// TODO: support overrides for instance properties
				editorDefaultToolbar.remove.forEach( function(itemName) {
					thisEditor.removeToolbarItem(itemName);
					});

				thisEditor.addCommand('markdown', 'addMarkdownImage', (settings, ed) => {
					let url = encodeURI(settings.url);
					if(Object.hasOwn(settings, 'classes')) {
						url += '?classes=' + settings.classes.join();
					}

					let newMarkdown = `![${settings.alt}](${url})`;

					const captionProvided = ( Object.hasOwn(settings, 'caption') && settings.caption.trim().length > 0);
					if(captionProvided) {
						newMarkdown = `[figure caption="${settings.caption}"]${newMarkdown}[/figure]`;
					}

					thisEditor.replaceSelection(newMarkdown);
					});

				if(typeof boundTextarea !== undefined) {
					boundTextarea.style.display = 'none';
					boundTextarea.setAttribute('readonly', 'readonly');

					thisEditor.on('change', function() {
						boundTextarea.value = thisEditor.getMarkdown();
						});
				}
			}


			return thisEditor;

			},

		});

	const __createContainer = (node) => {
		const container = document.createElement('div');
		container.appendChild(node);
		return container;
		};

	const __createForm = (inner) => {
		const form = document.createElement('form');
		form.setAttribute('name', 'addImageCustom'); // should this be unique?
		// const mediaSelect = Object.keys(mediaListOnLoad).map(m => `<option value="/${window.GravAdmin.config.route}/${m}">${m}</option>`).join("\n");
		form.innerHTML = inner;
		return form;
		};

	toastui.Editor.prototype.addButton = (inner, thisEditor) => { // context required via thisEditor because I am struggling to access the editor instance in this method
		const form = __createForm(inner);
		const container = __createContainer(form);
		const fields = form.elements;

		fields.submitButton.style.display = 'inline'; // TODO: put this somewhere more sensible like CSS
		fields.classes.style['margin-top'] = '1rem'; // as above, so below
		Array.from(fields.classes.getElementsByTagName('label')).forEach((l) => {
			l.style.display = 'inline';
			l.style['padding-right'] = '0.5rem';
			}); // also this

		const closePopup = () => {
			thisEditor.eventEmitter.emit('closePopup');
			thisEditor.focus();
			};
		fields.cancelButton.addEventListener('click', closePopup);

		fields.newImage.addEventListener('change', (e) => {
			GravPlugin.adminAddonToastUiEditor.uploadMedia(e.target.files[0], () => {
				const fileName = fields.newImage.files[0].name;
				const uploadOptionIndex = fields.url.selectedOptions.item(0).index;
				fields.url.add(new Option(fileName, `/${window.GravAdmin.config.route}/${fileName}`, false, true), uploadOptionIndex+1);
				});
			});

		fields.url.addEventListener('change', (e) => {
			if (e.target.selectedOptions.item(0).id == `imgUploader-${thisEditor.options.el.id}`) {
				fields.newImage.showPicker();
				/* TODO: refresh the Page Media control here */
			}
			else {
				if(Object.hasOwn(mediaListOnLoad, e.target.value)) {
					const selectedMediaAsset = mediaListOnLoad[e.target.value];
					if(fields.caption.value.trim().length == 0 && Object.hasOwn(selectedMediaAsset, 'caption')) {
						fields.caption.value = selectedMediaAsset.caption;
					}
					if(fields.alt.value.trim().length == 0 && Object.hasOwn(selectedMediaAsset, 'alt')) {
						fields.alt.value = selectedMediaAsset.alt;
					}
				}
				else {
					/* TODO: handle this */
				}
			}
			});

		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const values = {
				url: fields.url.value,
				alt: fields.alt.value,
				caption: fields.caption.value,
				};

			const classes = Array.from(fields.classes.elements).filter(c => c.checked);
			if (classes.length > 0) {
				values['classes'] = classes.map(c => c.value);
			}
			thisEditor.eventEmitter.emit('command', 'addMarkdownImage', values);
			closePopup();
			});

		thisEditor.insertToolbarItem({}, {
			name: 'markdownImagePopup',
			tooltip: 'Add an image',
			popup: {
				body: container,
				style: { width: 'auto' },
			},
			className: 'toastui-editor-toolbar-icons image',
			});

		};

//	});
