import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const BlogPage: React.FC = () => {
    const { blogPosts } = useApp();

    return (
        <div className="bg-foam-white py-20">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-poppins font-bold text-center mb-12 text-storm-blue">Hikayeler</h1>
                <div className="max-w-4xl mx-auto space-y-12">
                    {blogPosts.map(post => (
                        <div key={post.id} className="grid md:grid-cols-3 gap-8 items-center">
                            <div className="md:col-span-1">
                                <Link to={`/blog/${post.slug}`}>
                                    <img src={post.imageUrl} alt={post.title} className="rounded-lg shadow-lg w-full h-full object-cover aspect-video md:aspect-square" loading="lazy" />
                                </Link>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500 mb-2">{post.date} - {post.author}</p>
                                <h2 className="text-3xl font-poppins font-bold text-storm-blue mb-3">
                                    <Link to={`/blog/${post.slug}`} className="hover:text-teal-accent">
                                        {post.title}
                                    </Link>
                                </h2>
                                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }} />
                                <Link to={`/blog/${post.slug}`} className="text-teal-accent font-semibold mt-4 inline-block hover:text-rusty-orange">
                                    Devamını Oku &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
