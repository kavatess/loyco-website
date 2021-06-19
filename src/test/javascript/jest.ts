// Import all global libraries here
import $ from 'jquery';
global['$'] = global['jQuery'] = $;
import 'jest-preset-angular';
import './jest-global-mocks';
