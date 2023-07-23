# Admin Addon Toast Ui Editor Plugin

*The **Admin Addon Toast Ui Editor** Plugin is an extension for [Grav CMS](https://github.com/getgrav/grav). Add a [Toast UI editor](https://ui.toast.com/tui-editor) field to admin blueprints for markdown editing.

## Installation

The Admin Addon Toast Ui Editor plugin requires and only works within the Admin plugin. Admin is listed as a dependency and must be installed.

Installing this plugin plugin can be done in one of two ways:

* The GPM (Grav Package Manager) installation method lets you quickly install the plugin with a simple terminal command;
* the manual method lets you do so via a zip file.

> **Advanced method**: If you maintain a `.dependencies` file for your project, you can also install the plugin by adding its details to that file and running [`bin/grav install`](https://learn.getgrav.org/cli-console/grav-cli#install).

### GPM Installation (Preferred)

To install the plugin via the [GPM](https://learn.getgrav.org/cli-console/grav-cli-gpm), through your system's terminal (also called the command line), navigate to the root of your Grav-installation, and enter:

    bin/gpm install admin-addon-toast-ui-editor

This will install the Admin Addon Toast Ui Editor plugin into your `/user/plugins`-directory within Grav. Its files can be found under `/your/site/grav/user/plugins/admin-addon-toast-ui-editor`.

### Manual Installation

To install the plugin manually, download the zip-version of this repository and unzip it under `/your/site/grav/user/plugins`. Then rename the folder to `admin-addon-toast-ui-editor`. You can find these files on [GitHub](https://github.com/hughbris/grav-plugin-admin-addon-toast-ui-editor) or via [GetGrav.org](https://getgrav.org/downloads/plugins).

You should now have all the plugin files under

    /your/site/grav/user/plugins/admin-addon-toast-ui-editor
	
> NOTE: This plugin is a modular component for Grav which may require other plugins to operate, please see its [blueprints.yaml-file on GitHub](https://github.com/hughbris/grav-plugin-admin-addon-toast-ui-editor/blob/main/blueprints.yaml).

## Configuration

Before configuring this plugin, you should copy the `user/plugins/admin-addon-toast-ui-editor/admin-addon-toast-ui-editor.yaml` to `user/config/plugins/admin-addon-toast-ui-editor.yaml` and only edit that copy.

Here is the default configuration and an explanation of available options:

```yaml
enabled: true
# assets: # Off by default, meaning we use local copies of these assets.
    # When toggled on, these default to:
#   js: 'https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js'
#   css: 'https://uicdn.toast.com/editor/latest/toastui-editor.min.css'
defaults:
  usageStatistics: false # https://nhn.github.io/tui.editor/latest/#Collect-statistics-on-the-use-of-open-source
  initialEditType: 'markdown'
  previewStyle: 'vertical'
# toolbar: # Off by default, so we use ToastUI default toolbar
#   remove: ['array', 'of', 'toolbar', 'names', 'to', remove']
```

**`assets.js`** / **`assets.css`**: Toggle these on in Admin or add the property directly into YAML if you want to set a URL for the Toast UI script and stylesheet assets. The default is the official CDN URL (latest version permalink). If you toggle either of these fields `off` or do not set them, the plugin will use a local copy. In most cases, this is sufficient.

**`defaults.initialEditType`**
**`defaults.previewStyle`**: Set [default (global) options](https://nhn.github.io/tui.editor/latest/ToastUIEditorCore) for any editors created in blueprints. These can be overridden for any specific field in blueprints as explained under [Usage below](#custom-field-options). These options, and only a small selection of others, are available through the plugin's Admin template. However, you can add any others you find in this [well-documented API](https://nhn.github.io/tui.editor/latest/ToastUIEditorCore) manually by editing the plugin's YAML configuration.

**`defaults.usageStatistics`**: [Send your hostname to Google Analytics](https://nhn.github.io/tui.editor/latest/#Collect-statistics-on-the-use-of-open-source). ToastUI has this enabled by default, but it is _off_ here by default. By all means help a great open source project to collect usage data, I'm just not going to enable that by default on behalf of my users when the data custodian is an advertising corporation.

**`toolbar.remove`**: Remove Toast UI editor toolbar items globally, identified by name

> Note that if you use the Admin Plugin, a file with your configuration named admin-addon-toast-ui-editor.yaml will be saved in the `user/config/plugins/` folder once the configuration is saved in the Admin.

## Usage

The plugin is enabled by default.

In your Admin blueprints, add or replace these properties to your editor field(s) wherever you want a Toast UI editor:

```yaml
type: toastui
validate:
    type: textarea # I have copied this and am yet to test whether it's actually important
```

### Custom field options

For any editor field, you can override global plugin editor options (`defaults`) by adding options under `attributes.toastui` like this (for example):

```yaml
myeditorfield:
    # ...
    attributes:
        toastui:
            initialEditType: wysiwyg
```

## Credits

* [@OleVik](https://github.com/OleVik) [with this answer](https://github.com/getgrav/grav/issues/1438#issuecomment-295670646) pointed me to a whole lot of information I was having trouble finding.
* @newbthenewbd for providing a [custom editor field type plugin exemplar](https://github.com/newbthenewbd/grav-plugin-tinymce-editor) that made getting started much simpler.
* Developers of Toast UI for creating a lovely editor and, critically (ahem, \*cough\* Stackedit), making it easily customisable and [pretty well documented](https://nhn.github.io/tui.editor/latest/) with examples.

## To Do

- [ ] Add basic configuration options
- [x] Support custom editor options globally and per instance
- [ ] Document how to add/modify toolbar buttons
- [ ] Try getting an expanded view similar to default codemirror
- [ ] Add a debug mode to show the shadow textarea and log to console

There seem to be infinite tweaks I could make to the JS, and indeed editors can probably be created from a classname alone without needing a custom field type. I'm going to reserve my judgement and leave this kind of optimisation to later.
