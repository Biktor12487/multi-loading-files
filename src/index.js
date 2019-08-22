const multiLoadingFiles = (selector, options)  => {
    const fields = document.querySelectorAll(selector);
    const createElement = ({ tagName = 'div', attributes = [], className = '', html = ''}) => {
        const element = document.createElement(tagName);
        element.className = className;
        attributes.forEach(({ name, value }) => element.setAttribute(name, value));
        element.innerHTML = html;
        return {
            element: element,
            removeElement: () => element.remove()
        }
    };
    const getUniqKey = () => new Date().getTime() + '-key-' + Math.random();
    const createFileLabel = (fileName, index) => {
        const fileLabel = createElement({ tagName: 'li', className: 'multi-loading-files__item', html: fileName});
        const fileButtonDelete = createElement({ tagName: 'button', attributes: [{
            name: 'type', value: 'button'}, { name: 'title', value: 'Delete files'}], html: 'x', className: 'multi-loading-files__item-delete'});

        fileLabel.element.appendChild(fileButtonDelete.element);
        return {
            elementLabel: fileLabel.element,
            elementButton: fileButtonDelete.element,
            onDelete: (fn) => fileButtonDelete.element.addEventListener('click', fn),
        }
    };
    const setFilesList = (files, item, fileList) => {
        fileList.innerHTML = '';
        Array.from(files).forEach((file, index) => {
            const fileElement = createFileLabel(file.name, index);
            fileList.appendChild(fileElement.elementLabel);
            fileElement.onDelete((e) => console.log(e))
        });
    };
    const handleOnChange = (item, fileList) => (e) => {
      if (options.onChange) options.onChange(e);
      setFilesList(e.target.files, item, fileList)
    };
    const initInputs =  () => {
        fields.forEach((item, index) => {
            const wrapper = createElement({ tagName: 'div',  className: 'multi-loading-files'});
            const fileList = createElement({ tagName: 'ul', className: 'multi-loading-files__list-files'});
            const uniqKeyIdField = getUniqKey();
            const label = createElement({ tagName: 'label',
                className: 'multi-loading-files__label',
                attributes: [{ name: 'for', value: uniqKeyIdField }],
                html: 'Loading files'});
            const inputElementCopy = item;
            inputElementCopy.setAttribute('id', uniqKeyIdField)
            item.parentElement.insertBefore(wrapper.element, item.nextSibling);
            item.remove();
            wrapper.element.appendChild(inputElementCopy);
            wrapper.element.appendChild(label.element);
            wrapper.element.appendChild(fileList.element);
            item.addEventListener('change', handleOnChange(item.element, fileList.element))
        });
    };
    initInputs();
    return {
        onChange: (fn) => callOnChange(),
    };
};

multiLoadingFiles('.multi-input', {
    onChange: e => console.log(e)
});