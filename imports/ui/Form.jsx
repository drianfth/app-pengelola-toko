import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BarangCollection } from '/imports/api/BarangCollection';


export const Form = () => {

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [jml_barang, setJumlah] = useState("");
  const [distributor, setDistributor] = useState("");
  const history = useHistory();


  const handleSubmit = e => {
    e.preventDefault();
    if (!nama && !harga && !jml_barang && !distributor) return;

    BarangCollection.insert({
      nama: nama.trim(),
      harga: harga.trim(),
      jml_barang: parseInt(jml_barang),
      distributor: distributor.trim(),
      createdAt: new Date()
    });

    setNama("");
    setHarga("");
    setJumlah("");
    setDistributor("");
    history.push("/");
  }




  return (
    <div className="card column is-10 mx-auto formulir my-5">
      <header className="card-header ">
        <p className="card-header-title is-size-5 ">
          Tambah Barang
        </p>
      </header>
      <div className="card-content">
        <div className="content">

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label className="label has-text-weight-normal">Nama Barang</label>
              <div className="control">
                <input className="input" type="text" placeholder="Nama Barang" value={nama} onChange={(e) => setNama(e.target.value)} />
              </div>
            </div>

            <div className="columns">
              <div className="field column is-6">
                <label className="label has-text-weight-normal">Harga</label>
                <div className="control">
                  <input className="input" type="number" placeholder="Text input" value={harga} onChange={(e) => setHarga(e.target.value)} />
                </div>
              </div>

              <div className="field column is-6">
                <label className="label has-text-weight-normal">Jumlah Barang</label>
                <div className="control">
                  <input className="input" type="number" placeholder="Text input" value={jml_barang} onChange={(e) => setJumlah(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="field column is-12">
                <label className="label has-text-weight-normal">Distributor</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Text input" value={distributor} onChange={(e) => setDistributor(e.target.value)} />
                </div>
              </div>

            </div>


            <div className="columns">
              <div className="column is-2">
                <Link to={'/'} className='tombol-submit button is-primary'><i class="fa fa-arrow-left"></i></Link>
              </div>
              <div className="column is-9"></div>
              <div className="column is-1">
                <button type='submit' className='tombol-submit button is-link'>Add</button>
              </div>
            </div>


          </form>
        </div>
      </div>
    </div >
  );
}
