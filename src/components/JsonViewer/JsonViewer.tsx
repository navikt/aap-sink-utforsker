import dynamic from 'next/dynamic';

export const JsonViewer = dynamic(import('react-json-view'), { ssr: false });
