const getLinkByHref = (page, href) => page.$(`a[href*="${href}"]`);

const typeIntoInput = async (input, text) => {
    await input.click({ clickCount: 3 });
    await input.type(text);
}

const getInnerText = async element => await (await element.getProperty('textContent')).jsonValue();

exports.getLinkByHref = getLinkByHref;
exports.typeIntoInput = typeIntoInput;
exports.getInnerText = getInnerText;
