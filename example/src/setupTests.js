import '@testing-library/jest-dom';
import MutationObserver from '@sheerun/mutationobserver-shim';

window.MutationObserver = MutationObserver; // https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0
