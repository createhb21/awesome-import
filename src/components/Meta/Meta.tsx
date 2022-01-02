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
    };
}

const Meta = ({ metaData }: MetaTypes) => {
    const lang = locales['en'];
    const title = metaData.title;
    const description = metaData.description;
    const currentUrl = metaData.url;

    return (
        <Helmet titleTemplate="%s">
            <html lang={lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href={logo} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="awesome import" />
            <meta property="og:title" content={title} />
            {description ? <meta property="og:description" content={description} /> : null}
            <meta property="og:image" content={logo} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description ? <meta name="twitter:description" content={description} /> : null}
            <meta name="twitter:image" content={logo} /> : null
            <meta name="twitter:site" content="awesome import" />
        </Helmet>
    );
};

export default Meta;
