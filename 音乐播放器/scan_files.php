<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// 设置音乐文件夹和歌词文件夹路径
$musicDir = '../音乐/';
$lyricsDir = './歌词/';

function scanMusicFiles($musicDir, $lyricsDir) {
    $result = array();
    
    // 检查音乐文件夹是否存在
    if (!is_dir($musicDir)) {
        return array('error' => '音乐文件夹不存在: ' . $musicDir);
    }
    
    // 支持的音频格式
    $supportedFormats = array('mp4', 'mp3', 'wav', 'ogg', 'webm', 'm4a', 'aac', 'flac');
    
    // 扫描音乐文件夹
    $files = scandir($musicDir);
    
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }
        
        $filePath = $musicDir . $file;
        if (is_file($filePath)) {
            $fileInfo = pathinfo($file);
            $extension = strtolower($fileInfo['extension']);
            
            // 检查是否为支持的音频格式
            if (in_array($extension, $supportedFormats)) {
                $baseName = $fileInfo['filename'];
                
                // 查找对应的歌词文件
                $lyricsFile = null;
                if (is_dir($lyricsDir)) {
                    $possibleLyricsFile = $lyricsDir . $baseName . '.txt';
                    if (file_exists($possibleLyricsFile)) {
                        $lyricsFile = $baseName . '.txt';
                    }
                }
                
                // 生成显示名称（移除文件扩展名）
                $displayName = $baseName;
                
                // 添加到结果数组
                $result[] = array(
                    'file' => $file,
                    'displayName' => $displayName,
                    'lyricsFile' => $lyricsFile,
                    'baseName' => $baseName
                );
            }
        }
    }
    
    // 按文件名排序
    usort($result, function($a, $b) {
        return strcmp($a['displayName'], $b['displayName']);
    });
    
    return $result;
}

try {
    $musicFiles = scanMusicFiles($musicDir, $lyricsDir);
    echo json_encode(array(
        'success' => true,
        'files' => $musicFiles,
        'count' => count($musicFiles)
    ), JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ), JSON_UNESCAPED_UNICODE);
}
?>
