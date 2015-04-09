<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CustomFieldInfo
 *
 * @author Praveen
 */
final class CustomFieldInfo {
//put your code here

    public $fieldName;
    public $fieldValue;
    public $isEncrypted = false;
    public $encryptedValue = "";

    public function __construct($fieldName, $fieldValue, $isEncrypted) {
        $this->fieldName = $fieldName;
        $this->fieldValue = $fieldValue;
        $this->isEncrypted = $isEncrypted;
    }

    public function getFieldName() {
        return $this->fieldName;
    }

    public function getFieldValue() {
        return $this->fieldValue;
    }

    public function getIsEncrypted() {
        return $this->isEncrypted;
    }

    public function getEncryptedValue() {
        return $this->encryptedValue;
    }

    public function setFieldName($value) {
        $this->fieldName = $value;
    }

    public function setFieldValue($value) {
        $this->fieldValue = $value;
    }

    public function setIsEncrypted($value) {
        $this->isEncrypted = $value;
    }

    public function setEncryptedValue($value) {
        $this->encryptedValue = $value;
    }

}
?>
