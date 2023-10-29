<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;

/**
 * Class AdminAddonToastUIEditorPlugin
 * @package Grav\Plugin
 */
class AdminAddonToastUIEditorPlugin extends Plugin
{
    /**
     * @return array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'onPluginsInitialized' => [
                ['onPluginsInitialized', 0],
            ]
        ];
    }

    /**
     * Initialize the plugin
     */
    public function onPluginsInitialized(): void {
        // Only proceed if we are in the admin plugin
        if (!$this->isAdmin()) {
            return;
        }

        // Enable the main events we are interested in
        $this->enable([
            'onAdminTwigTemplatePaths' => ['addTemplatePath', 0],
            'onAssetsInitialized' => ['addAssets', 10],
        ]);
    }

    public function addTemplatePath($event) {
        $event['paths'] = array_merge(
            $event['paths'], [
                'user://admin/themes/grav/templates',
                __DIR__ . '/admin/themes/grav/templates',
            ]
            ); // thanks @OleVik https://github.com/getgrav/grav/issues/1438#issuecomment-295670646
        return $event;
    }

    public function addAssets() {
        $this->grav['assets']->addJs(isset($this->config()['assets']['js']) ? $this->config()['assets']['js'] : 'plugin://admin-addon-toast-ui-editor/assets/js/toastui-editor-all.min.js');
        $this->grav['assets']->addCss(isset($this->config()['assets']['css']) ? $this->config()['assets']['css'] : 'plugin://admin-addon-toast-ui-editor/assets/css/toastui-editor.min.css');

        // TODO: add toggleable blueprints that override key content areas, similar to https://github.com/newbthenewbd/grav-plugin-tinymce-editor/tree/develop/blueprints
        // $this->grav['locator']->addPath('blueprints', '', __DIR__ . "/blueprints");
    }

}
