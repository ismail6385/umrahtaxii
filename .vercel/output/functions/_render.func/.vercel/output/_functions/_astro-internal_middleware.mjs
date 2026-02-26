!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"d464f7b191a11d8dc15194fb430678e63582c4f8"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="db2ac48a-18aa-4012-adb5-29301954abfc",e._sentryDebugIdIdentifier="sentry-dbid-db2ac48a-18aa-4012-adb5-29301954abfc");})();}catch(e){}};import 'es-module-lexer';
import './chunks/astro-designed-error-pages_Bnmteq1N.mjs';
import 'cookie';
import { s as sequence } from './chunks/index_B4U2_89v.mjs';
import { onRequest as onRequest$1 } from '@sentry/astro/middleware';

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
