const express = require('express')
const connectDB = require('./db.js')
const userModel = require('./models/userModel.js')
const reviewModel = require('./models/reviewModel.js')
const basketModel = require('./models/basketModel.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

connectDB()

app.listen(port, () => console.log(`Listening on port ${port}`))

app.post('/api/add-review', async (req, res) => {
  try {
    const { userName, email, text } = req.body

    if (email) {
      if (!userName || !email)
        return res.status(400).json({ message: 'Enter the values!' })
  
      const newReview = new reviewModel({
        userName,
        email,
        text,
      })
      const save = await newReview.save()
      return res.status(200).json({message: "Review added!"}, save)
    }
    return res.status(400).json({ error: 'You are not authorized!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
  }
})

app.delete('/api/delete-review', async (req, res) => {
  try {
    const { id, email } = req.body
    if (!email) 
      return res.status(400).json({ error: 'You are not authorized!' })
    
    const deletedReview = await reviewModel.findByIdAndDelete(id)

    return res.status(200).json({ message: 'Review deleted!' })
  } catch (error) {
    console.log(error)
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
})

app.get('/api/reviews', async (req, res) => {
  const reviews = await reviewModel.find()
  res.json(reviews)
})

app.post('/api/registration', async (req, res) => {
  try {
    const { name, surname, email, password, confirmPassword } = req.body

    if (!name || !surname || !email || !password || !confirmPassword)
      return res.status(400).json({ error: 'Enter the values!' })

    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Passwords do not match!' })

    const candidate = await userModel.findOne({ email })
    if (candidate)
      return res.status(400).json({ error: 'Such user already exists!' })

    const user = new userModel({
      name,
      surname,
      email,
      password,
      confirmPassword,
    })
    const save = await user.save()
    return res
      .status(200)
      .json(
        { message: 'You registered successfully!', email: save.email },
        save
      )
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: 'Enter the values!' })

    const user = await userModel.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Email not found!' })

    if (password !== user.password)
      return res.status(400).json({ error: 'Password is not valid!' })

    return res.status(200).json({ message: 'Login successful!', email: email })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
  }
})

// app.get('/api/users', (req, res) => {
//   res.json([
//     {
//       id: 1,
//       name: 'Pavel',
//       surname: 'Buylin',
//       email: 'buylin399pavel@gmail.com',
//       password: 'pasha123',
//     },
//     {
//       id: 2,
//       name: 'Alex',
//       surname: 'Chubenko',
//       email: 'sasha@gmail.com',
//       password: 'sasha123',
//     },
//     {
//       id: 3,
//       name: 'Petro',
//       surname: 'Petrov',
//       email: 'petro@gmail.com',
//       password: 'petro123',
//     },
//   ])
// })
const addProductCount = async (res, email, product, candidate) => {
  const updatedCount = await basketModel.findOneAndUpdate(
    {email: email, 'product.name': product.name}, {count: candidate.count + 1}
  )
  return res.status(200).json({ message: 'Product added to basket!' }, updatedCount)
}

const subProductCount = async (res, product, candidate) => {
  const updatedCount = await basketModel.findOneAndUpdate(
    {'product.name': product.name}, {count: candidate.count - 1}
  )
  return res.status(200).json({ message: 'One product has been subtracted from your basket!' }, updatedCount)
}

app.post('/api/baskets', async (req, res) => {
  try {
    const { email, product } = req.body
    const candidate = await basketModel.findOne({email: email, 'product.name': product.name})

    if (email) {
      if (!candidate) {
        const count = 1
        const newBasket = new basketModel({
          email,
          product,
          count
        })
        const save = await newBasket.save()
        return res.status(200).json({ message: 'New product added to basket!' }, save)
      }
      return addProductCount(res, email, product, candidate)
    }
    return res.status(400).json({ error: 'You are not authorized!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
  }
})

app.post('/api/add-count', async (req, res) => {
  const { email, product } = req.body
  const candidate = await basketModel.findOne({email: email, 'product.name': product.name})
  return addProductCount(res, email, product, candidate)
})
app.post('/api/sub-count', async (req, res) => {
  const { email, product } = req.body
  const candidate = await basketModel.findOne({email: email, 'product.name': product.name})
  return subProductCount(res, product, candidate)
})

app.post('/api/get-products-in-basket', async (req, res) => {
  try {
    const { email } = req.body
    const products = await basketModel.find({ email: email })
    // const prices = products.map(p => p.product.price)
    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
  }
})

app.delete('/api/delete-products-from-basket', async (req, res) => {
  try {
    const { _id } = req.body
    const deletedProduct = await basketModel.findOneAndDelete({_id: _id})
    return res.status(200).json({ message: 'Product deleted from your basket!' })
  } catch (error) {
    console.log(error)
  }
})

const path = require('path')
app.use('/images', express.static(path.join(__dirname, 'images')))

app.get('/api/products', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Computer ARTLINE Gaming X63',
      image: '/images/ARTLINE Gaming X63.png',
      price: 770,
      specs: {
        type: 'Computer',
        processor: 'Intel Core i5-12400F',
        graphicsCard: 'NVIDIA GeForce GTX 1660 Super 6GB',
        ram: '16GB DDR4',
        storage: '512GB SSD',
        operatingSystem: 'Windows 11 Home'
      }
    },
    {
      id: 2,
      name: 'Computer ARTLINE WorkStation W53',
      image: '/images/ARTLINE WorkStation W53.png',
      price: 580,
      specs: {
        type: 'Computer',
        processor: 'AMD Ryzen 5 5600G',
        graphicsCard: 'Integrated Radeon Graphics',
        ram: '16GB DDR4',
        storage: '1TB HDD + 256GB SSD',
        operatingSystem: 'Windows 10 Pro'
      }
    },
    {
      id: 3,
      name: 'Computer ARTLINE Gaming X39',
      image: '/images/ARTLINE Gaming X39.png',
      price: 780,
      specs: {
        type: 'Computer',
        processor: 'Intel Core i5-12400F',
        graphicsCard: 'NVIDIA GeForce RTX 3050 8GB',
        ram: '16GB DDR4',
        storage: '1TB SSD',
        operatingSystem: 'Windows 11 Home'
      }
    },
    {
      id: 4,
      name: 'Gaming keyboard 2E-KG315-GAMING_-Black',
      image: '/images/2E-KG315-GAMING_-Black.png',
      price: 22,
      specs: {
        type: 'Keyboard',
        connection: 'Wired USB',
        switchType: 'Membrane',
        backlight: 'Rainbow LED',
        layout: 'Ukrainian/English',
        keyRollover: '19-Key Anti-Ghosting',
        wristRest: ''
      }
    },
    {
      id: 5,
      name: 'Gaming keyboard GamePro-Headshot-GK398-USB',
      image: '/images/GamePro-Headshot-GK398-USB.png',
      price: 15,
      specs: {
        type: 'Keyboard',
        connection: 'Wired USB',
        switchType: 'Membrane',
        backlight: 'RGB',
        layout: 'English',
        keyRollover: '',
        wristRest: ''
      }
    },
    {
      id: 6,
      name: 'Gaming keyboard RAZER-Ornata-V3-X_-UKR',
      image: '/images/RAZER-Ornata-V3-X_-UKR.png',
      price: 58,
      specs: {
        type: 'Keyboard',
        connection: 'Wired USB',
        switchType: 'Mecha-Membrane',
        backlight: 'Single-zone RGB',
        layout: 'Ukrainian/English',
        keyRollover: '',
        wristRest: 'Detachable'
      }
    },
    {
      id: 7,
      name: 'Gaming mouse Esperanza-MX205-FIGHTER-Green',
      image: '/images/Esperanza-MX205-FIGHTER-Green.png',
      price: 10,
      specs: {
        type: 'Mouse',
        connection: 'Wired USB',
        dpi: '800 / 1200 / 1600',
        buttons: '6',
        lighting: 'Green LED',
        sensorType: 'Optical'
      }
    },
    {
      id: 8,
      name: 'Gaming mouse Logitech-G102-Lightsync-Black',
      image: '/images/Logitech-G102-Lightsync-Black.png',
      price: 44,
      specs: {
        type: 'Mouse',
        connection: 'Wired USB',
        dpi: '200 – 8000',
        buttons: '6 Programmable',
        lighting: 'RGB Lightsync',
        sensorType: 'Gaming-grade Optical'
      }
    },
    {
      id: 9,
      name: 'Gaming mouse Razer-DeathAdder-Essential-Black',
      image: '/images/Razer-DeathAdder-Essential-Black.png',
      price: 34,
      specs: {
        type: 'Mouse',
        connection: 'Wired USB',
        dpi: '6400',
        buttons: '5 Programmable',
        lighting: 'Green Backlight',
        sensorType: 'Optical'
      }
    },
  ])
})