<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JSONSerializer
 *
 * @author Praveen
 */
final class JSONSerializer {
//put your code here

    private function __construct() {

    }

    static public function encode($inputData) {
        return json_encode($inputData);
    }

    static public function decode($inputJson) {
        return json_decode($inputJson);
    }


    static public function copyObject($sourceObj, $destinationObj) {

        foreach ($sourceObj as $property => $value) {
            if (is_array($value)) {
                $list = self::copyArrayObject($value, str_replace('List','',$property));
                $value = $list;
            }
            $fn = 'set'.$property;

            if (method_exists($destinationObj,$fn)) {
                $destinationObj->$fn($value);
            }
        }

        return $destinationObj;
    }

    static public function copyArrayObject($obj, $className) {
        $returnArrObj = null;

        //p("Creating new class : ".$className);
        $classRef = new $className;

        if (is_array($obj)) {

            $returnArrObj = array();

            foreach ($obj as $arrObj) {

                if (is_array($arrObj)) {
                    $returnArrObj[] = self::copyArrayObject($arrObj, str_replace('List','',$property));
                } else {
                    $returnArrObj[] = self::copyObject($arrObj, $classRef);
                }

            }

            return $returnArrObj;

        } else {

            return self::copyObject($obj, $classRef); //Now what if list has a list
        }
    }

    //IMPORTANT: DONT USE THIS FUNCTION. BUGGY - ONLY TO BE USED BY FRAMEWORK AS OF NOW
    static public function decodeArrayAs($inputJson, $className) {
    //IMPORTANT: DONT USE THIS FUNCTION. BUGGY - ONLY TO BE USED BY FRAMEWORK AS OF NOW
        $obj = self::decode($inputJson);

        $returnArrObj = null;

        $returnArrObj = self::copyArrayObject($obj, $className);

        return $returnArrObj;
    }

    static public function decodeAs($inputJson, &$objToCast) {
        $obj = self::decode($inputJson);

        if (!is_array($obj)) {
            $objToCast = JSONSerializer::copyObject($obj, $objToCast);
        }

        return $objToCast;
    }

}
?>
