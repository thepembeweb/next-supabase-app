import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import configuration from './src/configuration';

const siteUrl = configuration.site.siteUrl;

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    live: {
      type: 'boolean',
      description: 'Whether the post is live or not',
      required: true,
      default: false,
    },
    image: {
      type: 'string',
      description: 'The path to the cover image',
    },
    description: {
      type: 'string',
      description: 'The description of the post',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${getSlug(post._raw.sourceFileName)}`,
    },
    readingTime: {
      type: 'number',
      resolve: (post) => calculateReadingTime(post.body.raw),
    },
    slug: {
      type: 'string',
      resolve: (post) => getSlug(post._raw.sourceFileName),
    },
    structuredData: {
      type: 'object',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.date,
        description: doc.description,
        image: [siteUrl, doc.image].join(''),
        url: [siteUrl, 'blog', doc._raw.flattenedPath].join('/'),
        author: {
          '@type': 'Organization',
          name: configuration.site.name,
        },
      }),
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});

function calculateReadingTime(content) {
  const wordsPerMinute = 235;
  const numberOfWords = content.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;

  return Math.ceil(minutes);
}

function getSlug(fileName) {
  return fileName.replace('.mdx', '');
}
