
const verifyAdmin = (req, res, next) => {
    if (req.userRole !== 'Administrador') {
      return res.status(403).json({ error: 'Acceso denegado. Solo los administradores pueden acceder a esta vista.' });
    }
    next();
  };
  
  export default verifyAdmin;
  