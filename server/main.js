import { Meteor } from 'meteor/meteor';

import { BarangCollection } from '/imports/api/BarangCollection';

function insertBarang({ nama, harga, jml_barang, tgl_masuk, status }) {
  BarangCollection.insert({nama, harga, jml_barang, tgl_masuk, status, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (BarangCollection.find().count() === 0) {

    insertBarang({
      nama: 'Pensil', 
      harga: 2000, 
      jml_barang: 20, 
      tgl_masuk: new Date(), 
      status: 'Tersedia'
    });

    insertBarang({
      nama: 'Penggaris', 
      harga: 12000, 
      jml_barang: 10, 
      tgl_masuk: new Date(), 
      status: 'Tersedia'
    });
    insertBarang({
      nama: 'Hasduk SD', 
      harga: 7000, 
      jml_barang: 5, 
      tgl_masuk: new Date(), 
      status: 'Tersedia'
    });
    insertBarang({
      nama: 'Penghapus',
      harga: 2000,
      jml_barang: 15, 
      tgl_masuk: new Date(), 
      status: 'Tersedia'
    });

  }
});
