"use client";

import { useState, useEffect } from 'react';
import { UploadButton } from "@/utils/uploadthing";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Download,
    Eye,
    File,
    Image as ImageIcon,
    FileText,
    Archive,
    Video,
    Upload,
    Trash2,
    Calendar,
    HardDrive
} from 'lucide-react';
import { format } from 'date-fns';

interface UploadedFile {
    id: string;
    name: string;
    url: string;
    size: number;
    type: string;
    uploadedAt: string;
}

function getFileIcon(fileType: string) {
    if (fileType.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (fileType.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (fileType.includes('pdf') || fileType.includes('document')) return <FileText className="h-4 w-4" />;
    if (fileType.includes('zip') || fileType.includes('rar')) return <Archive className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
}

function getFileTypeLabel(fileType: string) {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType.startsWith('video/')) return 'Video';
    if (fileType.includes('pdf')) return 'PDF';
    if (fileType.includes('document')) return 'Document';
    if (fileType.includes('zip') || fileType.includes('rar')) return 'Archive';
    return fileType.split('/')[1]?.toUpperCase() || 'File';
}

function formatFileSize(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function FilesHome() {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        // Load files from localStorage on mount
        const savedFiles = localStorage.getItem('uploadedFiles');
        if (savedFiles) {
            setFiles(JSON.parse(savedFiles));
        }
    }, []);

    const saveFiles = (updatedFiles: UploadedFile[]) => {
        setFiles(updatedFiles);
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    };

    const handleUploadComplete = (res: { key?: string; name: string; url: string; size?: number; type?: string }[]) => {
        const newFiles: UploadedFile[] = res.map(file => ({
            id: file.key || Date.now().toString(),
            name: file.name,
            url: file.url,
            size: file.size || 0,
            type: file.type || 'application/octet-stream',
            uploadedAt: new Date().toISOString(),
        }));

        const updatedFiles = [...files, ...newFiles];
        saveFiles(updatedFiles);
        setIsUploading(false);
    };

    const handleDeleteFile = (fileId: string) => {
        const updatedFiles = files.filter(file => file.id !== fileId);
        saveFiles(updatedFiles);
    };

    const handleViewFile = (url: string) => {
        window.open(url, '_blank');
    };

    const handleDownloadFile = (url: string, filename: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Files</h1>
                <p className="text-foreground/70">Manage your uploaded files</p>
            </div>

            {/* Upload Section */}
            <Card className="mb-8 border-2 border-border shadow-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Upload Files
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-base bg-secondary-background/20">
                        <UploadButton
                            endpoint="fileUploader"
                            onClientUploadComplete={handleUploadComplete}
                            onUploadError={(error: Error) => {
                                console.error("Upload error:", error);
                                setIsUploading(false);
                            }}
                            onUploadBegin={() => setIsUploading(true)}
                            appearance={{
                                button: "bg-main text-main-foreground border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all",
                                allowedContent: "text-foreground/70 text-sm"
                            }}
                        />
                        {isUploading && (
                            <p className="text-sm text-foreground/70 mt-2">Uploading...</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Files List */}
            {files.length === 0 ? (
                <Card className="border-2 border-border">
                    <CardContent className="py-12 text-center">
                        <File className="h-12 w-12 mx-auto mb-4 text-foreground/30" />
                        <h3 className="text-lg font-medium mb-2">No files uploaded yet</h3>
                        <p className="text-foreground/70">Upload your first file to get started</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Your Files ({files.length})</h2>
                    </div>

                    {files.map((file) => (
                        <Card key={file.id} className="border-2 border-border shadow-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                                        <div className="flex-shrink-0">
                                            {getFileIcon(file.type)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-foreground truncate">{file.name}</h3>
                                            <div className="flex items-center space-x-4 text-sm text-foreground/70 mt-1">
                                                <div className="flex items-center space-x-1">
                                                    <Badge variant="neutral" className="text-xs">
                                                        {getFileTypeLabel(file.type)}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <HardDrive className="h-3 w-3" />
                                                    <span>{formatFileSize(file.size)}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{format(new Date(file.uploadedAt), 'MMM dd, yyyy')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button
                                            size="sm"
                                            variant="neutral"
                                            onClick={() => handleViewFile(file.url)}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="neutral"
                                            onClick={() => handleDownloadFile(file.url, file.name)}
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="neutral"
                                            onClick={() => handleDeleteFile(file.id)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
