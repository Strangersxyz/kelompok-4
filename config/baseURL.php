<?php 

$url = ''; // Sesuaikan dengan lokasi folder

if(!defined('BASE_URL')) {
    define('BASE_URL', $url);
}

function base_url($path = '') {
    return BASE_URL . ltrim($path = '/');
}

function dist_url($path = '') {
    return base_url('dist/' . ltrim($path = '/'));
}

function asset_url($path = '') {
    return base_url('asset/' . ltrim($path = '/'));
}

?>