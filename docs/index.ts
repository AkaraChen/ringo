import '@akrc/fish/fish.css';
import {message, MessageProps, notice} from '../src/index';
import '../style/message/default.css';
import '../style/notice/default.css';

const $ = (arg: string) => document.querySelector(arg);
const lorem =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi fugit fuga incidunt.';

const type = ['info', 'warning', 'error', 'success'] as Array<
    MessageProps['type']
>;

const $message = (opinion: Partial<MessageProps>) => {
    message(Object.assign({text: lorem, showClose: true}, opinion));
};

type.forEach((item) => {
    $(`#message_${item}`)!.addEventListener('click', () => {
        $message({type: item, duration: 0});
    });
    $(`#notice_${item}`)!.addEventListener('click', () =>
        notice({text: 'This is a message.', type: item})
    );
});
