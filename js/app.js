import { AudioEngine } from './audio/AudioEngine.js';
import { UIController } from './controllers/UIController.js';
import { Toast } from './ui/toast.js';

const audioEngine = new AudioEngine();
const toast = new Toast();
const ui = new UIController(audioEngine, toast);

ui.init();
