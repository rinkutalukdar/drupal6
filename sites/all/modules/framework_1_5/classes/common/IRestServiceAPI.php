<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of IRestServiceAPI
 *
 * @author Praveen
 */

interface IRestServiceAPI{
    function execute(ServiceInfo $serviceInfo, $serviceData);
}
?>
