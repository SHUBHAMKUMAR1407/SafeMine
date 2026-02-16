import React, { useState } from 'react';
import { BookOpen, FileText, Video, Award, Search, ChevronRight } from 'lucide-react';

const KnowledgeCenter = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: 'All Resources' },
        { id: 'guidelines', label: 'Safety Guidelines' },
        { id: 'research', label: 'Research Papers' },
        { id: 'training', label: 'Training Modules' },
        { id: 'regulations', label: 'Regulations' }
    ];

    const resources = [
        {
            id: 1,
            title: 'Mines Act, 1952 - Comprehensive Guide',
            category: 'regulations',
            type: 'PDF',
            date: 'Jan 15, 2024',
            description: 'A detailed overview of the Mines Act, 1952, including recent amendments and compliance requirements.',
            link: 'https://labour.gov.in/sites/default/files/TheMinesAct1952.pdf'
        },
        {
            id: 2,
            title: 'Advanced Dust Control Techniques in Open Cast Mines',
            category: 'research',
            type: 'Research Paper',
            date: 'Feb 02, 2024',
            description: 'Study on the efficacy of mist cannons and chemical suppressants in reducing particulate matter.',
            link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8268046/'
        },
        {
            id: 3,
            title: 'Emergency Response Protocol - Level 3',
            category: 'guidelines',
            type: 'Guide',
            date: 'Mar 10, 2024',
            description: 'Standard operating procedures for handling structural failures and gas leaks in underground mines.',
            link: 'https://www.cdc.gov/niosh/mining/UserFiles/works/pdfs/2012-140.pdf'
        },
        {
            id: 4,
            title: 'Heavy Machinery Operation Safety Certification',
            category: 'training',
            type: 'Video Course',
            date: 'Mar 22, 2024',
            description: 'Video training module for operators of dumpers, excavators, and draglines.',
            link: 'https://www.youtube.com/watch?v=FqM5gNEJtq8'
        },
        {
            id: 5,
            title: 'Coal Mines Regulations, 2017',
            category: 'regulations',
            type: 'PDF',
            date: 'Dec 05, 2023',
            description: 'Official gazette notification regarding the updated regulations for coal mine safety.',
            link: 'https://labour.gov.in/sites/default/files/CoalMinesRegulations2017.pdf'
        },
        {
            id: 6,
            title: 'AI in Predictive Maintenance',
            category: 'research',
            type: 'Article',
            date: 'Apr 05, 2024',
            description: 'How artificial intelligence is being used to predict machinery failures before they occur.',
            link: 'https://www.mdpi.com/2075-163X/11/11/1210'
        }
    ];

    const filteredResources = resources.filter(resource => {
        const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="w-full max-w-screen-xl mx-auto px-8 mb-12 mt-12 font-roboto">
            {/* Hero Section */}
            <div className="bg-gray-100 py-12 rounded-lg">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4 tracking-wide text-gray-800">
                        <span className="text-black">Knowledge</span> <span className="text-[#D4B030]">Center</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                        A centralized repository for safety guidelines, regulatory documents, research findings, and training materials essential for the mining industry.
                    </p>

                    <div className="mt-8 max-w-xl mx-auto relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for documents, topics, or guidelines..."
                            className="w-full py-3 px-6 pl-12 rounded-lg border border-gray-300 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#D4B030] shadow-sm font-sans"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 font-sans">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-full border transition-all duration-300 ${activeCategory === cat.id
                                ? 'bg-[#CA8A04] text-white border-[#CA8A04] shadow-md'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-[#CA8A04] hover:text-[#CA8A04]'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Resource Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map(resource => (
                        <div key={resource.id} className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-lg ${resource.category === 'regulations' ? 'bg-blue-50 text-blue-600' :
                                        resource.category === 'research' ? 'bg-purple-50 text-purple-600' :
                                            resource.category === 'guidelines' ? 'bg-green-50 text-green-600' :
                                                'bg-orange-50 text-orange-600'
                                        }`}>
                                        {resource.category === 'regulations' && <BookOpen size={24} />}
                                        {resource.category === 'research' && <FileText size={24} />}
                                        {resource.category === 'guidelines' && <Award size={24} />}
                                        {resource.category === 'training' && <Video size={24} />}
                                    </div>
                                    <span className="text-xs font-sans font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {resource.type}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#CA8A04] transition-colors">
                                    {resource.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-sans leading-relaxed mb-6">
                                    {resource.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-100 font-sans">
                                    <span className="text-gray-400 text-xs">{resource.date}</span>
                                    <a
                                        href={resource.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-[#CA8A04] font-medium text-sm hover:translate-x-1 transition-transform"
                                    >
                                        View Resource <ChevronRight size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KnowledgeCenter;
