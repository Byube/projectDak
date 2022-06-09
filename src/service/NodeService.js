export default class NodeService {

    getTreeTableNodes() {
        // return fetch('data/treetablenodes.json').then(res => res.json()).then(d => d.root);
        return fetch('data/treeTestTable.json').then(res => res.json()).then(d => d.root);
    }

    getTreeTableNodes2() {
        // return fetch('data/treetablenodes.json').then(res => res.json()).then(d => d.root);
        return fetch('data/treeT1.json').then(res => res.json()).then(d => d.root);
    }

    getTreeNodes() {
        // return fetch('data/treenodes.json').then(res => res.json()).then(d => d.root);
        return fetch('data/treeTest.json').then(res => res.json()).then(d => d.root);
    }
    
}
