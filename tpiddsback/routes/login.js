

// Ruta para el inicio de sesión
router.post("/login", async (req, res) => {
    // Verificar que los datos del formulario sean válidos
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Debe completar todos los campos." });
      return;
    }
  
    // Verificar que el usuario exista en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: "El nombre de usuario o la contraseña son incorrectos." });
      return;
    }
  
    // Crear un token de autenticación
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  
    // Devolver el token de autenticación
    res.status(200).json({ token });
  });