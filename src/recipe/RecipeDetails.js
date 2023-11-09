import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createClient } from 'contentful';
import { marked } from 'marked';

const RecipeDetails = () => {
    const [singleRecipePost, setSingleRecipePost] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        const client = createClient({
            space: "ia3edx98tiia",
            accessToken: "qZv6Yb6W0xk-IGIfdTGvHUTIN-62G5PA7oxthgd_jMM"
        });

        const getEntryById = async () => {
            try {
                const entry = await client.getEntry(id);
                if (entry.sys.contentType.sys.id === 'foodRecipe') {
                    setSingleRecipePost(entry);
                }
            } catch (error) {
                console.log("Oops, an error occurred:", error);
            }
        }

        getEntryById();
    }, [id]); 

    if (!singleRecipePost) {
        return <div>Loading...</div>;
    }

    const date = new Date(singleRecipePost.fields.createdDate);

    // Convert Markdown description to HTML using 'marked'
    const descriptionHTML = marked(singleRecipePost.fields.description);

    return (
        <div>
            
            <div className="content pure-u-1 pure-u-md-3-4">
                <div className="posts">
                    <Link to="/RecipeList" className="content-subhead">Recipe List</Link>

                    <section className="post">
                        <header className="post-header">
                            <img
                                className='post-img'
                                src={singleRecipePost?.fields.image?.fields?.file?.url}
                                title=""
                                alt={singleRecipePost.fields.title}
                                width="578"
                                height="291"
                            />
                            <h2 className="post-title">{singleRecipePost.fields.title}</h2>
                            <p className="post-meta">
                                By <span className="post-author">{singleRecipePost.fields.author}</span>
                                Date{' '}
                                <span className="post-date">
                                    {date instanceof Date && !isNaN(date)
                                        ? new Intl.DateTimeFormat('en-DE', {
                                                month: 'long',
                                                day: '2-digit',
                                                year: 'numeric',
                                            }).format(date)
                                        : "Invalid Date"}
                                </span>
                            </p>
                        </header>
                        <div className="post-summary">
                            {/* Render the description as HTML */}
                            <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
                        </div>
                    </section>
                    
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;