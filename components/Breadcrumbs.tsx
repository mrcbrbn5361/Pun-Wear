import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbPath {
    name: string;
    path?: string;
}

interface BreadcrumbsProps {
    paths: BreadcrumbPath[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                {paths.map((p, index) => (
                    <li key={p.name}>
                        <div className="flex items-center">
                            {index > 0 && (
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                            {p.path ? (
                                <Link to={p.path} className="hover:text-teal-accent">
                                    {p.name}
                                </Link>
                            ) : (
                                <span className="font-medium text-gray-700">{p.name}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};
