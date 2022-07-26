import { async } from "@firebase/util";
import { collection, getDoc,updateDoc, getDocs, query, where, addDoc, doc, deleteDoc } from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import {db} from '../firebaseConfig';
import { auth } from '../firebaseConfig';
import router from "../router"


export const userDataStore = defineStore ("dataBase", {
    
    state: () => ({
        documents: [],
        loadingDoc: false,

    }),
    actions: {
        async getUrls(){
            if  (this.documents.length !== 0){
                return;
            }
            this.loadingDoc=true;
            try {
                const q = query(collection(db, "urls"),
                where("user","==",auth.currentUser.uid)
                );
                
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc =>{
                    //console.log(doc.id, doc.data())
                    this.documents.push({ 
                        id: doc.id,
                        ...doc.data()
                    });
                })
            } catch (error) {
                console.log(error);
            }finally {
                this.loadingDoc=false;
            } 
        },
        async addUrl(name){
            try {
                const objetDoc={
                    name:name,
                    short:nanoid(6),
                    user: auth.currentUser.uid
                };
                const docRef = await addDoc(collection(db, "urls"), objetDoc)
                //console.log(docRef)
                this.documents.push({
                    ...objetDoc,
                    id:docRef.id,
                })
            } catch (error) {
                console.log(error);
            }finally{

            }
        },
        async deleteUrl(id){
            try {
                const docref = doc(db, "urls", id)

                const docSnap = await getDoc(docref)
                if(!docSnap.exists()){
                    throw new Error("no existe el doc")
                }

                if(docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("acceso denegado")
                }

                await deleteDoc(docref);
                this.documents = this.documents.filter(item => item.id !== id)
            } catch (error) {
                console.log(error);
            }finally{

            }
        },
        async leerUrl(id){
            try {
                const docref = doc(db, "urls", id);
                const docSnap = await getDoc(docref);
                if(!docSnap.exists()){
                    throw new Error("no existe el doc")
                }

                if(docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("acceso denegado")
                }
                return docSnap.data().name
            } catch (error) {
                console.log(error);
            }finally{

            }
        },
        async updateUrl(id, name){
            try {
                const docref = doc(db, "urls", id);
                const docSnap = await getDoc(docref);
                if(!docSnap.exists()){
                    throw new Error("no existe el doc")
                }

                if(docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("acceso denegado")
                }
                
                await updateDoc(docref,{
                    mane:name,
                })
                this.documents =this.documents.map(item => item.id === id ? ({...item, name: name}) : item)
                router.push("/")
            } catch (error) {
                console.log(error);
            }finally{

            }
        }
    }
})