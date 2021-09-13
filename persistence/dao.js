module.exports = class DAO {
	constructor(fbAdmin) {
		this.fbAdmin = fbAdmin;
	}

	getFirestoreDataById(collection, id) {
		return new Promise((resolve, reject) => {
			return this.fbAdmin.firestore().collection(collection).doc(id).get().then(resp => {
				resolve(resp.data());
				return;
			}).catch(err => {
				reject(err);
				return;
			});
		});
	}

	getFirestoreData(collection, field, operator, value) {
		let elements = [];
		return new Promise((resolve, reject) => {
			return this.fbAdmin.firestore().collection(collection).where(field, operator, value).get().then(resp => {
				resp.forEach(doc => { elements.push(doc.data()) });
				resolve(elements);
				return;
			}).catch(err => {
				reject(err);
				return;
			});
		});
	}

	getFirestoreCollection(collection) {
		let elements = [];
		return new Promise((resolve, reject) => {
			return this.fbAdmin.firestore().collection(collection).get().then(resp => {
				resp.forEach(doc => { elements.push(doc.data()) });
				resolve(elements);
				return;
			}).catch(err => {
				reject(err);
				return;
			});
		});
	};

	setFirestoreData(collection, id, object) {
		return new Promise((resolve, reject) => {
			this.fbAdmin.firestore().collection(collection).doc(id).set(Object.assign({}, object)).then(res => resolve(res), err => reject(err))
		});
	};

	setFirestoreDataWithoutId(collection, object) {
		return new Promise((resolve, reject) => {
			let ref = this.fbAdmin.firestore().collection(collection).doc();
			object.id = ref.id;
			ref.set(Object.assign({}, object)).then(() => resolve(ref), err => reject(err));
		});
	};

	setFirestoreDataById(collection, id, object) {
		return new Promise((resolve, reject) => {
			let ref = this.fbAdmin.firestore().collection(collection).doc(id);
			ref.set(Object.assign({}, object)).then(() => resolve(ref), err => reject(err));
		});
	};

	updateFirestoreData(collection, id, object) {
		return new Promise((resolve, reject) => {
			return this.fbAdmin.firestore().collection(collection).doc(id).update(Object.assign({}, JSON.parse(JSON.stringify(object)))).then(resp => {
				resolve(resp);
				return;
			}).catch(err => {
				reject(err);
				return;
			});
		});
	}

	removeDataById(collection, id) {
		return new Promise(resolve => {
			return this.fbAdmin.firestore().collection(collection).doc(id).delete().then(resp => {
				resolve(resp);
				return;
			}).catch(err => {
				resolve(err);
				return;
			});
		});
	}

	removeDataByUID(collection, uid) {
		return new Promise((resolve, reject) => {
			return this.fbAdmin.firestore().collection(collection).where('uid', '==', uid).get().then(resp => {
				let x = [];
				resp.forEach(doc => x.push(doc.ref.delete()));
				Promise.all([x]).then(() => {
					resolve(resp);
					return;
				}).catch(err => {
					reject(err);
					return;
				});
			}).catch(err => {
				reject(err);
				return;
			});
		});
	}

	getRef(collection) {
		return this.fbAdmin.firestore().collection(collection).doc();
	}
};