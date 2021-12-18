import React, { useState, useEffect, useRef } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { BarangCollection } from '/imports/api/BarangCollection';



export const Data = () => {
  var no = 1;

  const [cari, setCari] = useState("");


  const inputEl = useRef("");
  const getDayName = (dayIndex) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[dayIndex];
  }

  const getStatus = (jml) => {
    if (jml <= 0)
      return "kosong";
    else
      return "tersedia";
  }

  const getColor = (status) => {
    if (status === "tersedia") return "tag is-success";
    else return "tag is-danger";
  }

  const search = e => {
    setCari(inputEl.current.value);
  }
  const barangs = useTracker(() => BarangCollection.find((cari != '') ? { nama: cari } : {}).fetch());

  useEffect(() => {
    search()
  }, [setCari]);

  const increament = ({ _id }, jml) => {
    jml++
    BarangCollection.update(_id, {
      $set: {
        jml_barang: jml
      }
    });
  };

  const decreament = ({ _id }, jml) => {

    if (jml === 0) {
      BarangCollection.update(_id, {
        $set: {
          jml_barang: 0
        }
      });
    } else {
      jml--
      BarangCollection.update(_id, {
        $set: {
          jml_barang: jml
        }
      });
    }

  };


  const Hasil = () => {
    const num = [];
    let result = 0;

    barangs.map((barang) => {
      num.push(barang.jml_barang)
    })

    for (let i = 0; i < num.length; i++) {
      result = result + num[i];
    }

    return result;
  }


  const deleteBarang = ({ _id }) => BarangCollection.remove(_id);

  return (


    <div className="card column is-12 mx-auto my-6">
      <header className="card-header">
        <p className="card-header-title is-size-5">
          Data Barang
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <div className="columns">
            <div className="column is-1">
              <Link to={'/add'} className='button is-info mb-3 '><i class="fa fa-plus mr-2"></i>Add</Link>
            </div>

            <div className="column is-1">
              <Link to={'/kalkulator'} className='button is-info mb-3  ml-2 is-rounded'><i class="fa fa-calculator is-size-5"></i></Link>
            </div>
            <div className="column is-6"></div>
            <div className="column is-3">

              <div className="field">
                <div className="control has-icons-right">
                  <input className="input is-link is-rounded" type="text" placeholder="Cari Barang" ref={inputEl} value={cari} onChange={search} />
                  <span className="icon is-right is-link">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>


            </div>
          </div>
          <table class="table is-fullwidth">
            <thead>
              <tr className='has-text-centered'>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Status</th>
                <th>Harga</th>
                <th>Distributor</th>
                <th>Tanggal Masuk</th>
                <th>Jumlah Barang</th>
                <th>Edit Jumlah</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {barangs.map((barang) => (

                <tr className='has-text-centered'>
                  <th key={barang._id}>{no++}</th>
                  <td>{barang.nama}</td>
                  <td>
                    <span className={getColor(getStatus(barang.jml_barang))}>
                      {getStatus(barang.jml_barang)}
                    </span>
                  </td>
                  <td>{barang.harga}</td>
                  <td>{barang.distributor}</td>
                  <td>{getDayName(barang.createdAt.getDay())}-{barang.createdAt.getDate()}-{barang.createdAt.getFullYear()}</td>
                  <td>
                    {barang.jml_barang}
                  </td>
                  <td>
                    <div className="is-flex is-align-items-center is-justify-content-center">
                      <button className='button is-small is-danger  is-inverted is-size-6 mr-2' onClick={() => decreament(barang, barang.jml_barang)}><i class="fa fa-minus"></i></button>
                      <button className='button is-small is-danger  is-inverted is-size-6' onClick={() => increament(barang, barang.jml_barang)}><i class="fa fa-plus"></i></button>
                    </div>
                  </td>
                  <td>
                    <button className='button is-danger' onClick={() => deleteBarang(barang)}><i class="fa fa-trash"></i></button>
                    <Link to={`/edit/${barang._id}`} className='button is-warning ml-1'><i class="fa fa-edit"></i></Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          <div class="box has-text-right">

            <strong>Total barang = </strong> <span className='ml-4'>{Hasil()}</span>
          </div>
        </div>
      </div>
    </div >














  )
}


