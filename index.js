const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client")
const cors = require('cors');


app.use(cors({ origin: 'http://localhost:5173' }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) =>{
    const allUsers = await prisma.user_pekerja.findMany();
    res.json(allUsers);
})


app.post("/", async (req, res) =>{
    const newUsers = await prisma.user_pekerja.create({data: req.body});
    res.json(newUsers);
})

app.get("/noKP", async (req, res) => {
  try {
    const { nokp } = req.query;
    const user = await prisma.user_pekerja.findFirst({
      where: {
        NoKP_Pekerja: nokp,
      },
    });
    res.json(user ? [user] : []);
  } catch (error) {
    console.error("Error retrieving NoKP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/telefon", async (req, res) => {
  try {
    const { telefon } = req.query;
    const user = await prisma.user_pekerja.findFirst({
      where: {
        Telefon_Pekerja: telefon,
      },
    });
    res.json(user ? [user] : []);
  } catch (error) {
    console.error("Error retrieving Telefon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cari", async (req, res) => {
  try {
    const searchId = req.query.Produk_ID || "";
    const allProduct = await prisma.produk.findMany({
      where: {
        Produk_ID: {
          contains: searchId,
        },
      },
      include: {
        Kategori: true
      }
    });

    res.json(allProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/cariKategori', async (req, res) => {
  try {
    const kategoriId = req.query.kategoriId || "";
    const allProduct = await prisma.produk.findMany({
      where: {
        kategoriProduk:{
          contains: kategoriId,
        } ,
      },
      include: {
        Kategori: true
      }
    });

    res.json(allProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/emel", async (req, res) => {
  try {
    const { emel } = req.query;
    const user = await prisma.user_pekerja.findFirst({
      where: {
        Emel_Pekerja: emel,
      },
    });
    res.json(user ? [user] : []);
  } catch (error) {
    console.error("Error retrieving Emel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/produk/:id", async (req, res) => {
  const id = req.params.id;
  const produkID = req.body.Produk_ID;
  const newProdukName = req.body.Nama_Produk;
  const newHarga = req.body.Harga_Produk;
  const newDesc = req.body.Deskripsi_Produk;
  // const namaKategori = req.body.Nama_Kategori;
  const newKategori = req.body.kategoriProduk;
  const newGambar = req.body.Gambar;

  console.log(req.body);

  const updateProduct = await prisma.produk.update({
    where: { id: id },
    data: {
      Produk_ID: produkID,
      Nama_Produk: newProdukName,
      Harga_Produk: newHarga,
      Deskripsi_Produk: newDesc,
      kategoriProduk: newKategori,
      Gambar: newGambar,
    }, 
  });

  res.json(updateProduct);
});

app.get("/role", async (req, res) => {
  try {
    const peranan = await prisma.user_pekerja.findMany({
      select: {
        Peranan_Pekerja: true,
      },
    });
    res.json(peranan);
  } catch (error) {
    console.error("Error retrieving Role:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/bilangan", async (req, res) => {
  const statuses = await prisma.produk.findMany({
    select: {
      Produk_ID: true,
      Kuantiti_Produk: true
    }
  });
  res.json(statuses);
});


app.get("/status", async (req, res) => {
  const statuses = await prisma.promosi.findMany({
    select: {
      Status_Promosi: true
    }
  });
  res.json(statuses);
});

app.get("/chart", async (req, res) => {
  const kategoriData = await prisma.kategori.findMany({
    include: {
      produk: true,
    },
  });

  const chartData = kategoriData.map(kategori => ({
    Kategori: {
      id: kategori.id,
      Nama_Kategori: kategori.Nama_Kategori,
      Deskripsi_Kategori: kategori.Deskripsi_Kategori,
    },
    Total_Kuantiti: kategori.produk.reduce((total, produk) => total + produk.Kuantiti_Produk, 0),
  }));

  res.json(chartData);
});

app.get("/stafID", async (req, res) => {
  try {
    const { idpekerja } = req.query;
    const user = await prisma.user_pekerja.findFirst({
      where: {
        Staf_ID: idpekerja,
      },
    });
    res.json(user ? [user] : []);
  } catch (error) {
    console.error("Error retrieving Staf ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cekKategori", async (req, res)=>{
  const kategori = await prisma.kategori.findMany({
    select:
    {
      Nama_Kategori:true
    }
  }) 
  res.json(kategori)
}) 

app.get("/aktif", async (req, res) => {
  try {
    const allPromosi = await prisma.promosi.findMany({
      where: {
        Status_Promosi: "Aktif",
      },
    });

    res.json(allPromosi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cekProduk", async (req, res)=>{
  const cekProduk = await prisma.produk.findMany({
    select:
    {
      Produk_ID:true
    }
  }) 
  res.json(cekProduk)
}) 

app.get("/cekIDPromosi", async (req, res)=>{
  const cekPromosi = await prisma.promosi.findMany({
    select:
    {
      ID_Promosi: true
    }
  }) 
  res.json(cekPromosi)
})

app.get("/cekNamaPromosi", async (req, res)=>{
  const cekPromosi = await prisma.promosi.findMany({
    select:
    {
      Nama_Promosi: true
    }
  }) 
  res.json(cekPromosi)
})

app.get("/kategori", async (req, res) =>{
  const nama = req.params.Nama_Kategori;
  const newKategori = await prisma.kategori.findMany({
      where:{
          nama,
      },
      include: {
      produk: true
      }
  });
  res.json(newKategori);
})

app.get("/produk", async (req, res) =>{
  const newProduk = await prisma.produk.findMany({
    include: {
      Kategori: true
    }
  });

  res.json(newProduk);
})

app.get("/amaran", async (req, res) => {
  const newProduk = await prisma.produk.findMany({
    where: {
      Kuantiti_Produk: {
        lt: 5
      }
    },
    include: {
      Kategori: true
    }
  });

  res.json(newProduk);
});

app.get("/kuantiti", async (req, res) => {
  const newProduk = await prisma.produk.findMany({
    include: {
      Kategori: true
    },
    where: {
      Kuantiti_Tambahan: {
        gt: 0
      }
    }
  });

  res.json(newProduk);
});

app.get("/promosi/:id", async (req, res) => {
  const { id } = req.params;
  
  const newPromosi = await prisma.promosi.findUnique({
    where: {
      id: id 
    },
    include: {
      Kategori: true
    }
  });
  
  res.json(newPromosi);
});



app.get("/promosi", async (req, res) => {
  const allPromosi = await prisma.promosi.findMany({
    include: {
      Kategori: true
    }
  });
  
  res.json(allPromosi);
});

app.get("/jualan", async (req, res) => {
  const allSales = await prisma.jualan.findMany();

  res.json(allSales);
});

app.get("/:id", async (req, res)=>{
  const oneWorker = await prisma.user_pekerja.findUnique({
    where:
    {
      id: req.params.id
    }
  })  
  res.json(oneWorker)
})

app.get('/dash/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const worker = await prisma.user_pekerja.findUnique({
      where: {
        Staf_ID: id,
      }
    });

    res.json(worker);
  } catch (error) {
    console.error('Error fetching worker data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get("/produk/:id", async (req, res)=>{
  const oneProduct = await prisma.produk.findUnique({
    where:
    {
      id: req.params.id
    }
  })  
  res.json(oneProduct)
})

app.post('/login', async (req, res) => {
  const { idPekerja, password } = req.body;

  try {
    const user = await prisma.user_pekerja.findUnique({
      where: { Staf_ID: idPekerja },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid ID' });
    }

    const passwordMatch = password === user.KataLaluan_Pekerja;

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    if (user.Peranan_Pekerja !== 'Pekerja') {
      return res.status(403).json({ error: 'Access Denied. Only workers are allowed.' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

app.post('/loginManager', async (req, res) => {
  const { idPekerja, password } = req.body;

  try {
    const user = await prisma.user_pekerja.findUnique({
      where: { Staf_ID: idPekerja },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid ID' });
    }

    const passwordMatch = password === user.KataLaluan_Pekerja;

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    if (user.Peranan_Pekerja !== 'Pengurus') {
      return res.status(403).json({ error: 'Access Denied. Only workers are allowed.' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user_pekerja.findUnique({
      where: { Staf_ID: id },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'An error occurred while retrieving user' });
  }
});





app.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newStaf = req.body.Staf_ID;
    const newNama = req.body.Nama_Pekerja;
    const newTel = req.body.Telefon_Pekerja;
    const newEmel = req.body.Emel_Pekerja;
    const newAlamat = req.body.Alamat_Pekerja;
    const newKP = req.body.NoKP_Pekerja;
    const newPeranan = req.body.Peranan_Pekerja;
    const newPass = req.body.KataLaluan_Pekerja;
    const newGaji = req.body.Gaji_Pekerja;
    const newGambar = req.body.GambarPekerja;

    console.log(req.body);
  
    const updateWorker = await prisma.user_pekerja.update({
      where: { id: id },
      data: {
        Nama_Pekerja: newNama,
        Staf_ID: newStaf,
        Telefon_Pekerja: newTel,
        Emel_Pekerja: newEmel,
        Alamat_Pekerja: newAlamat,
        NoKP_Pekerja: newKP,
        Peranan_Pekerja: newPeranan,
        KataLaluan_Pekerja: newPass,
        Gaji_Pekerja: newGaji,
        GambarPekerja: newGambar,
      },
    });
  
    res.json(updateWorker);
  });

app.delete("/:id", async (req, res) =>{
    const id = req.params.id;
    const deleteUsers = await prisma.user_pekerja.delete({
        where: { id: (id)},
    });
    res.json(deleteUsers);
})

app.put('/pangkah/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduk = await prisma.produk.update({
      where: { id },
      data: { Kuantiti_Tambahan: 0 },
    });
    res.json(updatedProduk);
  } catch (error) {
    console.error('Error updating produk:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/tambahKuantiti/:id', async (req, res) => {
  const { id } = req.params;
  const { kuantiti } = req.body;

  try {
    const product = await prisma.produk.update({
      where: { id: id.toString() },
      data: { Kuantiti_Tambahan: { increment: parseInt(kuantiti) } },
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the product quantity.' });
  }
});

app.get("/barang/:id", async (req, res) => {
  const { id } = req.params; 
  
  const newProduk = await prisma.produk.findUnique({
    where: {
      id: id 
    },
    include: {
      Kategori: true
    }
  });


  res.json(newProduk);
});


app.post("/produk", async (req, res) =>{
    const newProduk = await prisma.produk.create({data: req.body});
    res.json(newProduk);
})

app.delete("/produk/:id", async (req, res) => {
  try {
    const Produk_ID = req.params.id;

    // Retrieve the product to be deleted
    const product = await prisma.produk.findUnique({
      where: {
        Produk_ID: Produk_ID,
      },
      include: {
        Kategori: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create a copy of the related data
    const relatedKategori = { ...product.Kategori };

    // Delete the product from the produk table
    const deleteProduct = await prisma.produk.delete({
      where: {
        Produk_ID: Produk_ID,
      },
    });

    // Return the deleted product along with the related data
    res.json({
      deletedProduct: deleteProduct,
      relatedKategori: relatedKategori,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
});




app.post("/kategori", async (req, res) =>{
    const newKategori = await prisma.kategori.create({data: req.body});
    res.json(newKategori);
})

app.delete("/produk/:id", async (req, res) => {
  const id = req.params.id;
  const deleteProduct = await prisma.produk.delete({
    where: { Produk_ID: id },
  });
  res.json(deleteProduct);
});   

app.delete("/kategori/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteKategori = await prisma.kategori.delete({
      where: { id: id },
    });
    res.json(deleteKategori);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

 app.delete('/promosi/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletePromosi = await prisma.promosi.delete({
        where: { id: id },
      });
      res.json(deletePromosi);
    } catch (error) {
      console.error('Error deleting promotion:', error);
      res.status(500).json({ error: 'An error occurred while deleting the promotion.' });
    }
  });



app.post("/kategori/many", async (req, res) =>{
    const newKategori = await prisma.kategori.createMany({data: req.body});
    res.json(newKategori);
})

app.get("/kategori/:id", async (req, res)=>{
  const oneKategori = await prisma.kategori.findUnique({
    where:
    {
      id: req.params.id
    }
  })  
  res.json(oneKategori)
})



  app.put("/kategori/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const newNama = req.body.Nama_Kategori;
      const newDesc = req.body.Deskripsi_Kategori;
  
      const updateKategori = await prisma.kategori.update({
        where: { id: id },
        data: {
          Nama_Kategori: newNama,
          Deskripsi_Kategori: newDesc,
        },
      });
  
      res.json(updateKategori);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update kategori" });
    }
  });

  // CRUD Promosi
  
  
  app.post("/promosi", async (req, res) => {
    const newPromosi = await prisma.promosi.create({ data: req.body });
    res.json(newPromosi);
  }); 
  
  app.put("/promosi/:id", async (req, res) => {
    const id = req.params.id;
    const namaPromosi = req.body.Nama_Promosi;
    const descPromosi = req.body.Deskripsi_Promosi;
    const hargaPromosi = req.body.Harga_Promosi;
    const status = req.body.Status_Promosi;
    const kategori = req.body.kategoriTerlibat;
  
    console.log(req.body);
  
    const updatePromosi = await prisma.promosi.update({
      where: { id: id },
      data: {
        Nama_Promosi: namaPromosi,
        Deskripsi_Promosi: descPromosi,
        Harga_Promosi: hargaPromosi,
        Status_Promosi: status,
        kategoriTerlibat: kategori
      },
    });
  
    res.json(updatePromosi);
  });

  // CRUD Jualan

  // app.get("/jualan", async (req, res) => {
  //   try {
  //     const allSales = await prisma.jualan.findMany({
  //       include: {
  //         produk: true, // Include the 'produk' field
  //       },
  //     });
  
  //     res.json(allSales);
  //   } catch (error) {
  //     console.error("Error fetching sales:", error);
  //     res.status(500).json({ error: "An error occurred while fetching sales" });
  //   }
  // });

  app.post("/record-sales", async (req, res) => {
    const { cartItems, totalCart } = req.body;
  
    try {
      // Additional logic to handle storing multiple items from the cart
      // Create an array of records to be created in bulk
      const jualanRecords = cartItems.map((cartItem) => ({
        barcode: cartItem.productData?.Produk_ID,
        kuantiti: cartItem.kuantiti,
        jumlahHarga: cartItem.totalPrice,
        NamaProduk: cartItem.productData?.Nama_Produk,
        HargaProduk: parseInt(cartItem.productData?.Harga_Produk),
      }));
  
      // Create multiple records of jualan in the database
      const createdJualan = await prisma.jualan.createMany({
        data: jualanRecords,
      });
  
      // Respond with the newly created jualan records
      res.json(createdJualan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to record sales" });
    }
  });
  
  app.post('/update-product-quantity', async (req, res) => {
    const { productId, purchasedQuantity } = req.body;
  
    try {
      const product = await prisma.produk.findUnique({
        where: { Produk_ID: productId },
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const remainingQuantity = product.Kuantiti_Produk - purchasedQuantity;
  
      if (remainingQuantity < 0) {
        return res.status(400).json({ error: 'Insufficient quantity' });
      }
  
      await prisma.produk.update({
        where: { Produk_ID: productId },
        data: {
          Kuantiti_Produk: remainingQuantity // Convert remainingQuantity to a string
        },
      });
  
      res.json({ remainingQuantity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update product quantity" });
    }
  });

  app.put("/kuantiti/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const produk = await prisma.produk.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!produk) {
        return res.status(404).json({ error: "Produk not found" });
      }
  
      const updatedProduk = await prisma.produk.update({
        where: {
          id: id,
        },
        data: {
          Kuantiti_Produk: produk.Kuantiti_Produk + produk.Kuantiti_Tambahan,
          Kuantiti_Tambahan: 0,
        },
      });
  
      res.json(updatedProduk);
    } catch (error) {
      console.error("Error updating produk:", error);
      res.status(500).json({ error: "Failed to update produk" });
    }
  });
  
 

app.listen(Number(3001), "0.0.0.0", () => console.log('Server running on port $(3001)')); 
