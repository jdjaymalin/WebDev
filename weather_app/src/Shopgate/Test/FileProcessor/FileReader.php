<?php

namespace Shopgate\Test\FileProcessor;

class FileReader {
    
    public function readFile($path) {
        $absPath = getcwd() . '/' . $path;
        $data = file($absPath);
        
        if ($data === false) {
            if (!$this->isFileExists($absPath)) {
                die ("File {$absPath} does not exists!");
            }
            if (!$this->isFile($absPath)) {
                die("File {$path} is not a valid file!");
            }
            if (!$this->isReadable($absPath)) {
                die("File {$path} is not readable!");
            }
        }

        return $data;
    }

    public function isFileExists($path) {
        return file_exists($path);
    }

    public function isFile($path) {
        return is_file($path);
    }

    public function isReadable($path){
        return is_readable($path);
    }
}
