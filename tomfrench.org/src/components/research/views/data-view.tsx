'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Database } from "lucide-react";
import { DataSource } from '../types';
import { getTypeIconElement, getTypeColor } from '@/utils/research/data';

interface DataViewProps {
    dataSources: DataSource[];
    selectedDataSource: string | null;
    onDataSourceSelect: (id: string) => void;
}

export function DataView({
    dataSources,
    selectedDataSource,
    onDataSourceSelect,
}: DataViewProps) {
    const getDataSourceById = (id: string) => dataSources.find(ds => ds.id === id);



    return (
        <div className="grid grid-cols-10 gap-6 h-[80vh]">
            {/* Data Sources List (2/10) */}
            <div className="col-span-2 space-y-4">
                <h3 className="text-lg font-semibold">Data Sources</h3>
                <div className="space-y-3 max-h-full overflow-y-auto">
                    {dataSources.map((source) => (
                        <Card
                            key={source.id}
                            className={`cursor-pointer transition-all p-3 ${selectedDataSource === source.id ? 'ring-2 ring-main bg-accent/50' : 'hover:shadow-md'
                                }`}
                            onClick={() => onDataSourceSelect(source.id)}
                        >
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <div className={`p-1 rounded ${getTypeColor(source.type)}`}>
                                        {getTypeIconElement(source.type, 16)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-sm leading-tight">{source.title}</p>
                                        <p className="text-xs text-foreground/60 mt-1">{source.source}</p>
                                    </div>
                                </div>
                                <Badge variant="neutral" className="text-xs">
                                    {source.type}
                                </Badge>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Selected Data Source Details (8/10) */}
            <div className="col-span-8 space-y-4">
                <h3 className="text-lg font-semibold">Data Source Details</h3>
                {selectedDataSource ? (
                    <Card className="h-full">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${getTypeColor(getDataSourceById(selectedDataSource)!.type)}`}>
                                            {getTypeIconElement(getDataSourceById(selectedDataSource)!.type, 20)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{getDataSourceById(selectedDataSource)?.title}</CardTitle>
                                            <p className="text-foreground/70 mt-1">{getDataSourceById(selectedDataSource)?.source}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="neutral" className="text-sm">
                                            {getDataSourceById(selectedDataSource)?.type}
                                        </Badge>
                                        {getDataSourceById(selectedDataSource)?.year && (
                                            <Badge variant="neutral" className="text-sm">
                                                {getDataSourceById(selectedDataSource)?.year}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                {getDataSourceById(selectedDataSource)?.url && (
                                    <Button variant="default" className="shrink-0">
                                        <ExternalLink size={16} className="mr-2" />
                                        View Source
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Summary */}
                            <div>
                                <h4 className="font-semibold text-lg mb-3">Summary</h4>
                                <div className="text-foreground/80 leading-relaxed">
                                    {getDataSourceById(selectedDataSource)?.summary}
                                </div>
                            </div>

                            {/* Key Insights */}
                            {getDataSourceById(selectedDataSource)?.keyInsights && (
                                <div>
                                    <h4 className="font-semibold text-lg mb-3">Key Insights</h4>
                                    <ul className="space-y-2">
                                        {getDataSourceById(selectedDataSource)?.keyInsights?.map((insight, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-main rounded-full mt-2 shrink-0"></div>
                                                <div className="text-foreground/80">{insight}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Methodology */}
                            {getDataSourceById(selectedDataSource)?.methodology && (
                                <div>
                                    <h4 className="font-semibold text-lg mb-3">Methodology</h4>
                                    <div className="text-foreground/80 leading-relaxed">
                                        {getDataSourceById(selectedDataSource)?.methodology}
                                    </div>
                                </div>
                            )}

                            {/* Limitations */}
                            {getDataSourceById(selectedDataSource)?.limitations && (
                                <div>
                                    <h4 className="font-semibold text-lg mb-3">Limitations</h4>
                                    <div className="text-foreground/80 leading-relaxed">
                                        {getDataSourceById(selectedDataSource)?.limitations}
                                    </div>
                                </div>
                            )}

                            {/* Download/Access Information */}
                            <div className="pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Source Access</p>
                                        <p className="text-xs text-foreground/60">
                                            {getDataSourceById(selectedDataSource)?.accessInfo || 'Available online'}
                                        </p>
                                    </div>
                                    {getDataSourceById(selectedDataSource)?.url && (
                                        <Button variant="neutral" size="sm">
                                            <ExternalLink size={14} className="mr-1" />
                                            Open Link
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="h-full flex items-center justify-center">
                        <div className="text-center space-y-2">
                            <Database size={48} className="mx-auto text-foreground/40" />
                            <p className="text-foreground/60">Select a data source to view details</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
