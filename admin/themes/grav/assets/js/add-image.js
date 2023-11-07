// addEventListener('load', () => {

	var GravPlugin = GravPlugin || {};
	GravPlugin['adminAddonToastUiEditor'] = Object.assign((GravPlugin.adminAddonToastUiEditor || {}), {

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

				if(typeof boundTextarea !== undefined) {
					boundTextarea.style.display = 'none';
					boundTextarea.setAttribute('readonly', 'readonly');

					thisEditor.on('change', function() {
						boundTextarea.value = thisEditor.getMarkdown();
						});
				}
			}

				});

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
