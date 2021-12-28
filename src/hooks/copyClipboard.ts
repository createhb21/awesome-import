import { useEffect } from 'react';

export default function CopyClipboard() {
    let textarea = document.createElement('textarea');
    textarea.value = window.location.href;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // 추가

    document.execCommand('copy');
    document.body.removeChild(textarea);
    return;
}
