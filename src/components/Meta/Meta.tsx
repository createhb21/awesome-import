import React from 'react';
import { Helmet } from 'react-helmet-async';
import { logo } from '../../assets/images';

const locales = {
    en: 'en_US',
    ko: 'ko_KR',
};

export interface MetaTypes {
    metaData: {
        title: string;
        description: string;
        url: string;
        image: string;
    };
}

const Meta = ({ metaData }: MetaTypes) => {
    const lang = locales['en'];
    const title = metaData.title;
    const currentUrl = metaData.url;
    const description = metaData.description;
    const image = metaData.image;

    return (
        <Helmet titleTemplate="%s">
            <html lang={lang} />
            <title>{title}</title>
            {!image && <link rel="icon" href={logo} />}
            <meta name="description" content={description} />
            {image ? <link rel="image_src" href={image} /> : null}
            {image ? <meta itemProp="image" content={image} /> : null}
            {/* og */}
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="awesome import" />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={image} />
            {description ? <meta property="og:description" content={description} /> : null}
            {/* twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description ? <meta name="twitter:description" content={description} /> : null}
            <meta name="twitter:image" content={image} /> : null
            <meta name="twitter:site" content="awesome import" />
        </Helmet>
    );
};

export default Meta;
