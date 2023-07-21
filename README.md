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
```

Note that if you use the Admin Plugin, a file with your configuration named admin-addon-toast-ui-editor.yaml will be saved in the `user/config/plugins/` folder once the configuration is saved in the Admin.

## Usage

The plugin is enabled by default.

In your Admin blueprints, add or replace these properties to your editor field(s) wherever you want a Toast UI editor:

```yaml
type: toastui
validate:
    type: textarea # I have copied this and am yet to test whether it's important
```

## Credits

* [@OleVik](https://github.com/OleVik) [with this answer](https://github.com/getgrav/grav/issues/1438#issuecomment-295670646) pointed me to a whole lot of information I was having trouble finding.
* @newbthenewbd for providing a [custom editor field type plugin exemplar](https://github.com/newbthenewbd/grav-plugin-tinymce-editor) that made getting started much simpler.
* Developers of Toast UI for creating a lovely editor and, critically (ahem, \*cough\* Stackedit), making it easily customisable and [pretty well documented](https://nhn.github.io/tui.editor/latest/) with examples.

## To Do

- [ ] Add basic configuration options
- [ ] Support custom editor options globally and per instance
- [ ] Document how to add/modify toolbar buttons

There seem to be infinite tweaks I could make to the JS, and indeed editors can probably be created from a classname alone without needing a custom field type. I'm going to reserve my judgement and leave this kind of optimisation to later.
