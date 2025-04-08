`prezi` varchar(10) COLLATE utf8_persian_ci NOT NULL COMMENT ' ارائه مجتمع',
`title` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'نام درس',
`code` int(11) unsigned NOT NULL COMMENT 'كد درس',
`tag` varchar(10) COLLATE utf8_persian_ci NOT NULL COMMENT 'تگ ترم اولی',
`professor` varchar(40) COLLATE utf8_persian_ci NOT NULL COMMENT 'استاد',
`classlink` varchar(40) COLLATE utf8_persian_ci NOT NULL COMMENT 'استاد',
`schedule` varchar(100) COLLATE utf8_persian_ci NOT NULL COMMENT 'زمانبندي تشکيل کلاس'


id, prezi, title, code, tag, professor, classlink, classroom, schedule