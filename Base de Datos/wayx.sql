-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-02-2022 a las 20:59:16
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wayx`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `route`
--

CREATE TABLE `route` (
  `id` int(10) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `perfectTo` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `map` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `route`
--

INSERT INTO `route` (`id`, `name`, `location`, `type`, `perfectTo`, `map`, `image`, `description`) VALUES
(1, 'Tello', 'Valencia', 'mountains', 'Cycling', '39.3074798483259,-0.552072376012802', 'http://85.56.203.68/images/1672_23.png', 'Ruta en bici per el parc natural del Tello, prop de Picassent. Dura unes 4 horetes i es de nivell mitja més o menys, sin una bici de montanya es impossible.'),
(2, 'Lago de Anna', 'Valencia', 'touristic', 'Walking', '39.01034452537716,-0.6574788317084312', 'http://85.56.203.68/images/1941_26.png', 'Llac envoltat per vegetaciÃ³ amb zona de bany i picnic. Es pot passejar amb barca i hi ha restaurant. EstÃ  situat a un km d\'Anna, municipi de ValÃ¨ncia.'),
(3, 'Mareny de Rafalcaid', 'Valencia', 'beach', 'Bathing', '38.98768578366254,-0.15089605003595352', 'http://85.56.203.68/images/2465_28.png', 'Poble al costat de la poblacio de Daimus amb molt encant'),
(4, 'El retiro', 'Madrid', 'touristic', 'Walking', '40.4155946280016,-3.685445375740528', 'http://85.56.203.68/images/3670_30.png', 'Visita el parc mÃ©s famÃ³s de tota Espanya'),
(5, 'Ruta de las tres cascadas', 'Valencia', 'mountains', 'Walking', '39.020305862949016,-0.6414908543229103', 'http://85.56.203.68/images/1423_31.png', 'Recorregut de naturalesa al llarg de tres gorgos en el municipi d\'Anna'),
(6, 'Ruta dels Molins', 'Valencia', 'mountains', 'Walking', '39.39373438225998,-0.7644500210881233', 'http://85.56.203.68/images/6587_32.png', 'Recorregut de naturalesa en el terme d\'Alborache'),
(7, 'Platja de Pinedo', 'Valencia', 'beach', 'Walking', '39.42223085922278,-0.33352430909872055', 'http://85.56.203.68/images/8559_34.png', 'Platja prÃ²xima a la ciutat de ValÃ¨ncia amb recorregut per a passejar o anar amb bicicleta'),
(8, 'Port de Catarroja', 'Valencia', 'touristic', 'Walking', '39.391319506193796,-0.3732317313551903', 'http://85.56.203.68/images/4210_35.png', 'Un dels principals ports del parc natural de l\'Albufera on es poden realitzar passejos en barca.'),
(9, 'AqÃ¼educte de Segovia', 'Segovia', 'touristic', 'Sightseeing', '40.94827411499776,-4.118179231882095', 'http://85.56.203.68/images/853_1.png', 'ConstruÃ¯t pels romans en pedra fa dos mil anys. '),
(10, 'Toledo', 'Toledo', 'city', 'Sightseeing', '39.862696049622876,-4.027675464749336', 'http://85.56.203.68/images/3190_2.png', 'Ciutat de Castilla-La Mancha amb monuments medievals, Ã rabs, jueus i cristians.'),
(11, 'Ribadesella', 'Asturias', 'touristic', 'Sightseeing', '43.46366069920244,-5.054223909974098', 'http://85.56.203.68/images/6164_3.png', 'Ciutat costera d\'Asturies amb port i on es pot realitzar el descens del riu Sella. '),
(12, 'LeÃ³n', 'Leon', 'city', 'Sightseeing', '42.59973666623035,-5.567068308591843', 'http://85.56.203.68/images/8727_4.png', 'Ciutat de Castilla LeÃ³n amb un gran patrimoni histÃ³ric i monumental i pas  obligat del CamÃ­ de Santiago'),
(13, 'Avila', 'Avila', 'city', 'Sightseeing', '40.656891165157695,-4.681301973760128', 'http://85.56.203.68/images/5898_6.png', 'Ciutat de Castilla LeÃ³n coneguda per les seues impressionants muralles medievals'),
(14, 'Saragossa', 'Zaragoza', 'city', 'Walking', '41.6575360063387,-0.8791261911392212', 'http://85.56.203.68/images/4008_7.png', 'Ciutat aragonesa per on passa el riu Ebre. En ella es troba la BasÃ­lica del Pilar'),
(15, 'Valladolid', 'Valladolid', 'city', 'Walking', '41.65290618785172,-4.724066108465195', 'http://85.56.203.68/images/5164_8.png', 'Ciutat de Castilla LeÃ³n coneguda pels seus monuments religiosos medievals com l\'esglÃ©sia gÃ²tica de Sant Pau'),
(16, 'Sevilla', 'Sevilla', 'city', 'Sightseeing', '37.38590910675478,-5.994567163288593', 'http://85.56.203.68/images/2082_10.png', 'Ciutat andalusa. El seu centre histÃ²ric Ã©s un dels majors d\'Espanya.  Destaca la Catedral, la Giralda i la PlaÃ§a Espanya'),
(17, 'Los puentes colgantes', 'Valencia', 'mountains', 'Walking', '39.669616021044796,-0.8939524367451668', 'http://85.56.203.68/images/4095_1.png', 'Descubre la maravillosa ruta de los calderones, a escasos metros del municipio de Chulilla.Su dificultad es media, y necesitarÃ¡s mÃ­nimo 2h para recorrerla, a un ritmo tranquilo.'),
(18, 'Lanuza', 'Huesca', 'mountains', 'Walking', '42.75573856711262,-0.31486786901950836', 'http://85.56.203.68/images/6679_6.png', 'Municipi situat al Vall de Tena en els Pirineus amb un embalse. A l\'estiu hi ha un festival de mÃºsica anomenat Pirineus Sud'),
(19, 'Lago de Anna', 'Valencia', 'touristic', 'Bathing', '39.00960985406401,-0.6566416472196579', 'http://85.56.203.68/images/6176_9.png', 'Un bonito lago con animales y rodeado de restaurantes, con una piscina disponible para baÃ±arse con una casa da natural, perfecto para un domingo caluroso.'),
(20, 'Plaza EspaÃ±a Sevilla', 'Sevilla', 'touristic', 'Walking', '37.376697019456046,-5.987840183079243', 'http://85.56.203.68/images/3183_10.png', 'Una visita a la bellÃ­sima plaza EspaÃ±a de Sevilla, uno de los sitios mÃ¡s emblemÃ¡ticos de EspaÃ±a, donde ademÃ¡s se rodaron escenas de Star Wars'),
(21, 'Covadonga', 'Asturias', 'mountains', 'Caminar', '43.31229965988745,-5.059433430433273', 'http://85.56.203.68/images/5112_3.png', 'Santuari dedicat a la Mare de Deu de Covadonga conmemoratiu de la Batalla de Covadonga on va comenÃ§ar la Reconquesta. En el marc dels Pics d\'Europa'),
(22, 'Monasteri de Pedra', 'Zaragoza', 'touristic', 'Caminar', '41.195071003007286,-1.7820080369710922', 'http://85.56.203.68/images/2192_4.png', 'El riu Pedra forma un paratge de gran bellesa paisatgÃ­stica amb moltes cascades d\'aigua. Tot al voltant d\'un antic monasteri del Cister.'),
(23, 'Castell de Loarre', 'Huesca', 'touristic', 'Sightseeing', '42.32540457295592,-0.6126406788825989', 'http://85.56.203.68/images/6478_5.png', 'Castell romÃ nic del segle XI declarat Monument Nacional. Considerada la fortaleza romÃ nica millor conservada d\'Europa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userroutes`
--

CREATE TABLE `userroutes` (
  `userId` int(10) NOT NULL,
  `userRoute` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `userroutes`
--

INSERT INTO `userroutes` (`userId`, `userRoute`) VALUES
(2, 2),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(7, 17),
(2, 18),
(19, 19),
(19, 20),
(21, 21),
(21, 22),
(21, 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `userName` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `image` varchar(1000) CHARACTER SET utf8mb4 NOT NULL,
  `location` varchar(35) CHARACTER SET utf8mb4 DEFAULT NULL,
  `typeRoute` varchar(40) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `userName`, `password`, `email`, `image`, `location`, `typeRoute`) VALUES
(2, 'Itaca', '412438ee6b42aa2035cbac509400c5b2', 'aliruiz@gmail.es', 'http://85.56.203.68/images/7068_24.png', 'Valencia', 'Touristic'),
(4, 'Prueba', '202cb962ac59075b964b07152d234b70', 'prueba@gmail.com', 'http://85.56.203.68/images/5276_27.png', 'Valencia', 'City'),
(5, 'Sergio', '202cb962ac59075b964b07152d234b70', 'sergio@gmail.com', 'http://85.56.203.68/images/7954_29.png', 'Valencia', 'City'),
(7, 'Eduardo RuÃ¡', '3ba6bba2779a96dc92656923fb4efe8a', 'scrummaster@protonmail.com', 'http://85.56.203.68/images/7782_8.png', 'ValÃ¨ncia', 'Muntanya'),
(8, 'Fran', '81dc9bdb52d04dc20036dbd8313ed055', 'Franpastorruiz@gmail.es', 'http://85.56.203.68/images/5426_9.png', 'Valencia', 'Beach'),
(9, 'Loren', '32bfede9d62d66d84ab4075e7f15be26', 'lorenzamartinezmunoz72@gmail.com', 'http://85.56.203.68/images/user.png', 'Valencia', 'Platja'),
(10, 'Nicolas', '8c712e16f4d1cc31d51f9d89b911463f', 'nicogamer9777@gmail.com', 'http://85.56.203.68/images/6176_11.png', 'Valencia', 'City'),
(11, 'Alicia', '81dc9bdb52d04dc20036dbd8313ed055', 'aligh91@gmail.com', 'http://85.56.203.68/images/user.png', 'Madrid', 'Touristic'),
(12, 'Edu', 'b26ddd7d9662bbde98e31c84206a225d', 'eruana@hotmail.es', 'http://85.56.203.68/images/user.png', 'Valencia', 'City'),
(13, 'Manel', '82030e1597991bf616eb56c5dfc3f239', 'mviel@florida-uni.es', 'http://85.56.203.68/images/2798_2.png', 'Valencia', 'City'),
(14, 'Manel Viel', '82030e1597991bf616eb56c5dfc3f239', 'mviel@florida-uni.es', 'http://85.56.203.68/images/4734_3.png', 'Valencia', 'City'),
(15, 'Maria33', '81dc9bdb52d04dc20036dbd8313ed055', 'maria_7_88@hotmail.com', 'http://85.56.203.68/images/user.png', 'Valencia', 'City'),
(17, 'Maria', '81dc9bdb52d04dc20036dbd8313ed055', 'maria@gmail.com', 'http://85.56.203.68/images/user.png', 'Valencia', 'Beach'),
(18, 'Maria7', '827ccb0eea8a706c4c34a16891f84e7b', 'maria_7_88@hotmail.com', 'http://85.56.203.68/images/user.png', 'Valencia', 'City'),
(19, 'Jose', '81dc9bdb52d04dc20036dbd8313ed055', 'secundar123secundar@gmail.com', 'http://85.56.203.68/images/5103_8.png', 'Valencia', 'City'),
(20, 'Belen', '9450476b384b32d8ad8b758e76c98a69', 'belen22@gmail.com', 'http://85.56.203.68/images/6760_1.png', 'Valencia', 'Mountains'),
(21, 'Paco', '81dc9bdb52d04dc20036dbd8313ed055', 'Paco@gmail.com', 'http://85.56.203.68/images/7947_2.png', 'Valencia', 'Beach'),
(22, 'Ximo', '4e4e169124f6c5ff392ecf1336f9321b', 'xiqufe@floridauniversitria.es', 'http://85.56.203.68/images/7437_6.png', 'Valencia', 'City');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitedsites`
--

CREATE TABLE `visitedsites` (
  `userId` int(10) NOT NULL,
  `routeId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `visitedsites`
--

INSERT INTO `visitedsites` (`userId`, `routeId`) VALUES
(5, 2),
(5, 1),
(7, 2),
(9, 8),
(8, 3),
(11, 5),
(7, 17),
(13, 16),
(13, 17),
(17, 8),
(19, 2),
(19, 17),
(19, 13),
(19, 5),
(19, 1),
(21, 1),
(21, 1),
(21, 17),
(21, 12),
(7, 19),
(19, 6),
(22, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `userroutes`
--
ALTER TABLE `userroutes`
  ADD KEY `userId` (`userId`),
  ADD KEY `userRoute` (`userRoute`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitedsites`
--
ALTER TABLE `visitedsites`
  ADD KEY `userId` (`userId`),
  ADD KEY `routeId` (`routeId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `route`
--
ALTER TABLE `route`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `userroutes`
--
ALTER TABLE `userroutes`
  ADD CONSTRAINT `userroutes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `userroutes_ibfk_2` FOREIGN KEY (`userRoute`) REFERENCES `route` (`id`);

--
-- Filtros para la tabla `visitedsites`
--
ALTER TABLE `visitedsites`
  ADD CONSTRAINT `visitedsites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `visitedsites_ibfk_2` FOREIGN KEY (`routeId`) REFERENCES `route` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
