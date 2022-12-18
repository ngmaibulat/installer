export function isRoot() {
    if (typeof process.getuid != "function") {
        return false;
    }

    const uid = process.getuid();

    if (uid) {
        return false;
    }

    return true;
}
