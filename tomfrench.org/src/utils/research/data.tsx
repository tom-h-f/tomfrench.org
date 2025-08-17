import React from "react";
import { FileText, Database, Users, Calendar } from "lucide-react";

export const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'report': return FileText;
        case 'dataset': return Database;
        case 'survey': return Users;
        case 'statistics': return Calendar;
        default: return FileText;
    }
};

export const getTypeIconElement = (type: string, size: number = 16) => {
    const Icon = getTypeIcon(type);
    return <Icon size={size} />;
};

export const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
        case 'report': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
        case 'dataset': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
        case 'survey': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
        case 'statistics': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
};
