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
    public function onPluginsInitialized(): void
    {
        // Only proceed if we are in the admin plugin
        if (!$this->isAdmin()) {
            return;
        }

        // Enable the main events we are interested in
        $this->enable([
            // Put your main events here
        ]);
    }
}
