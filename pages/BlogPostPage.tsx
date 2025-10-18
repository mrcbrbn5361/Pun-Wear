import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const BlogPostPage: React.FC = () => {
    const { postSlug } = useParams<{ postSlug: string }>();
    const { blogPosts } = useApp();
    const post = blogPosts.find(p => p.slug === postSlug);

    if (!post) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl">Yazı bulunamadı.</h1>
                <Link to="/blog" className="text-teal-accent mt-4 inline-block">Tüm yazılara geri dön</Link>
            </div>
        );
    }

    return (
        <div className="bg-foam-white py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumbs paths={[
                        { name: "Ana Sayfa", path: "/" },
                        { name: "Hikayeler", path: "/blog" },
                        { name: post.title }
                    ]}/>
                    <h1 className="text-4xl md:text-5xl font-poppins font-bold text-storm-blue mt-6 mb-4">{post.title}</h1>
                    <p className="text-gray-500 mb-6">{post.date} - {post.author}</p>
                    <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg shadow-xl mb-8" />
                    <div
                        className="prose prose-lg max-w-none font-lato text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </div>
        </div>
    );
};
