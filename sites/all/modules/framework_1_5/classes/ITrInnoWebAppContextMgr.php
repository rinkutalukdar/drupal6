<?php

final class ITrInnoWebAppContextMgr {

    public static function getCurrent() {

        return $GLOBALS[WEB_CONTEXT_KEY];

    }

 

    /**

     * Context to be set. It allows to set only once as of now to avoid overwrite

     * Should be set something better.

     * @param ITrInnoAppContext $ctx

     */

    public static function setCurrent(ITrInnoWebAppContext $ctx) {

        if (!isset($GLOBALS[WEB_CONTEXT_KEY])) {

            $GLOBALS[WEB_CONTEXT_KEY] = $ctx;

        }

    }

 

}

?>