let urlAlphabet =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
export let nanoid = (size = 21) => {
    let id = ''
    let i = size
    while (i--) {
        id += urlAlphabet[(Math.random() * 64) | 0]
    }
    return id
}