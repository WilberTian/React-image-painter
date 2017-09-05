import { Modal } from 'antd';

const ConfirmModal = (args) => {
    const defaultArgs = {
        title: '删除',
        content: '确定删除么?',
        confirmCb: () => { console.log('cancel'); },
        cancelCb: () => { console.log('ok'); }
    };

    const confirm = Modal.confirm;
    confirm({ ...defaultArgs, ...args });
};

export default ConfirmModal;
