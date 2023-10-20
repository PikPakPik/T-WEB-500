/**
 * @swagger
 * tags:
 *   name: Advertissements
 *   description: Endpoints related to advertisements
 *
 * /:
 *   get:
 *     summary: Get all advertisements
 *     description: Retrieve a list of all advertisements
 *     tags: [Advertissements]
 *     responses:
 *       200:
 *         description: A list of advertisements.
 *       500:
 *          description: Internal Server Error
 *
 *
 */

/**
 * @swagger
 * /advert/{advertId}:
 *   get:
 *     summary: Get one advertisement
 *     description: Retrieve one advertissement
 *     tags: [Advertissements]
 *     parameters:
 *        - name: advertId
 *          in: path
 *          description: Id of the advertissement
 *          required: true
 *          schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: One advertisement.
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 *
 *
 *
 * /advertCompany/{companyId}:
 *   get:
 *     summary: Get all advertissements from one company
 *     description: Retrieve a list of all adverts from one company
 *     tags: [Advertissements]
 *     parameters:
 *        - name: companyId
 *          in: path
 *          description: Id of the company
 *          required: true
 *          schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: Retrieve a list of all adverts from one company.
 *       500:
 *         description: Internal Server Error
 *
 */
/**
 *@swagger
 *
 * /savedAdvert:
 *   get:
 *     summary: Get all saved advertisements from one user
 *     description: Retrieve a list of all saved adverts from one user
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieve a list of all saved adverts from one user.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securityDefinitions:
 *          bearerAuth:
 *              type: apiKey
 *              name: Authorization
 *              in: header
 *
 */
/**
 * @swagger
 *
 * /appliedAdvert:
 *   get:
 *     summary: Get all applied advertisements from one user
 *     description: Retrieve a list of all applied adverts from one user
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieve a list of all applied adverts from one user.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 *
 */
/**
 * @swagger
 *
 * /advert:
 *   post:
 *     summary: Create an advertissement
 *     description: As a company, I want to create an advert
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *        - name: title
 *          in: body
 *          description: Title of the advertissement
 *          required: true
 *        - name: description
 *          in: body
 *          description: Description of the advertissement
 *          required: true
 *        - name: place
 *          in: body
 *          description: Place of the job
 *          required: true
 *        - name: workingTime
 *          in: body
 *          description: The working time of the job
 *          required: true
 *        - name: expRequired
 *          in: body
 *          description: Experience required for the job
 *          required: true
 *        - name: wages
 *          in: body
 *          description: Wages for the job
 *          required: true
 *          schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: As a company, I want to create an advert.
 *         content:
 *              application/json:
 *                  example:
 *                      title: "Développeur web"
 *                      description: "Développeur web JS"
 *                      place: "Nantes"
 *                      workingTime: "Full-time"
 *                      expRequired: "Confirmé"
 *                      wages: 30000
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth
 */
/**
 * @swagger
 *
 *
 * /advert/{advertId}/save:
 *   post:
 *     summary: Update or Create an Job Information
 *     description: Check if the Job Information already exist, if exist, update it else create it
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Check if the Job Information already exist, if exist, update it else create it.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */
/**
 * @swagger
 *
 * /jobInformation/{advertId}:
 *   put:
 *     summary: Update or Create an Job Information
 *     description: Check if the Job Information already exist, if exist, update it else create it
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Check if the Job Information already exist, if exist, update it else create it.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 *
 *  @swagger
 * /advert/{advertId}:
 *   put:
 *     summary: Update an advertissement
 *     description: As a company, I want to update an advert
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: As a company, I want to update an advert.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 *
 */
/**
 *  @swagger
 *
 *
 * /advert/{advertId}:
 *   delete:
 *     summary: Delete one advertissement
 *     description: As a company, I want to delete one advertissement
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: As a company, I want to delete one advertissement.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints related to users
 *
 * /signup:
 *   post:
 *     summary: Create one user
 *     description: As a user, I want to create an account
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: As a user, I want to create an account.
 *       409:
 *         description: Email already exist
 *       500:
 *         description: Error while creating the user
 *
 *
 */
/**
 * @swagger
 *
 * /login:
 *   post:
 *     summary: Login
 *     description: As a user, I want to access to my account
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: As a user, I want to access to my account.
 *
 *
 */
/**
 * @swagger
 *
 * /user/{userId}:
 *   get:
 *     summary: Get one user
 *     description: Get the user's data
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get the user's data.
 *
 */
/**
 * @swagger
 *
 * /me:
 *   get:
 *     summary: Get my user's data
 *     description: As a logged user, I want to get my data
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: As a logged user, I want to get my data
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */
/**
 * @swagger
 *
 * /user:
 *   put:
 *     summary: Update user's data
 *     description: As a logged user, I want to update my data
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: As a logged user, I want to update my data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */
/**
 * @swagger
 *
 * /user/password:
 *   put:
 *     summary: Update the current user's password
 *     description: As a logged user, I want to update my password
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: As a logged user, I want to update my password
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */
/**
 * @swagger
 *
 * /user:
 *   delete:
 *     summary: Delete the current user's data
 *     description: As a logged user, I want to delete my data
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: As a logged user, I want to delete my data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Endpoints related to company
 *
 *
 * /company/{companyId}:
 *   get:
 *     summary: Get one company
 *     description: Retrieve one company
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Retrieve one company.
 *
 */
/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a company
 *     description: As a logged user, I want to create a company
 *     tags: [Company]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: As a logged user, I want to create a company.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 * @swagger
 *
 *
 * /company/{companyId}:
 *   put:
 *     summary: Update company's data
 *     description: As a logged admin user of the current company, I want to udpate the company's data
 *     tags: [Company]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: As a logged admin user of the current company, I want to udpate the company's data.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 * @swagger
 * /company/{companyId}:
 *   delete:
 *     summary: Delete company
 *     description: As a logged admin user of the current company, I want to delete my company
 *     tags: [Company]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: As a logged admin user of the current company, I want to delete my company.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 * @swagger
 *
 * tags:
 *   name: Applications
 *   description: Endpoints related to applications
 *
 * /application/{advertId}:
 *   post:
 *     summary: Apply to an advert
 *     description: As a user (logged or not), I want to apply to an advert
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: As a user (logged or not), I want to apply to an advert
 *
 */

/**
 * @swagger
 *
 * tags:
 *   name: Superman
 *   description: Endpoints related to superman
 *
 *
 *
 * /superman:
 *   get:
 *     summary: Get all superman's users
 *     description: Return if the current's user is a superman
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Return if the current's user is a superman
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 *
 */

/**
 * @swagger
 *
 *
 * /superman/advertissements:
 *   get:
 *     summary: Get all advertissement
 *     description: Get all advertisement with a pagination's system depending on the page and the limit
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all advertisement with a pagination's system depending on the page and the limit
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 * @swagger
 *
 *
 * /superman/users:
 *   get:
 *     summary: Get all users
 *     description: Get all users with a pagination's system depending on the page and the limit
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all users with a pagination's system depending on the page and the limit
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 * @swagger
 *
 *
 * /superman/applications:
 *   get:
 *     summary: Get all applications
 *     description: Get all applications with a pagination's system depending on the page and the limit
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all applications with a pagination's system depending on the page and the limit
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 * @swagger
 *
 *
 * /superman/company:
 *   get:
 *     summary: Get all companies
 *     description: Get all companies with a pagination's system depending on the page and the limit
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all companies with a pagination's system depending on the page and the limit
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */

/**
 * @swagger
 *
 *
 * /superman/advertissements/:companyId:
 *   post:
 *     summary: Create an advertisement
 *     description: Create an advertissement for a company
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create an advertissement for a company
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */
/**
 * @swagger
 *
 *
 * /superman/user:
 *   post:
 *     summary: Create an user
 *     description: Create an user
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create an user
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */
/**
 * @swagger
 *
 *
 * /superman/company:
 *   post:
 *     summary: Create a company
 *     description: Create a company for a user
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create a company for a user
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 *
 */
/**
 * @swagger
 *
 * /superman/advertissement/:advertId/update:
 *   put:
 *     summary: Update an advertissement
 *     description: Update an advertissement for a company
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update an advertissement for a company
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 */
/**
 * @swagger
 *
 * /superman/user/:userId:
 *   put:
 *     summary: Update an user
 *     description: Update an user
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update an user
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 */
/**
 * @swagger
 *
 * /superman/advertissement/:advertId:
 *   delete:
 *     summary: Delete an advertissement
 *     description: Delete an advertissement for a company
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete an advertissement for a company
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 */
/**
 * @swagger
 *
 * /superman/user/:userId:
 *   delete:
 *     summary: Delete an user
 *     description: Delete an user
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete an user
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 */
/**
 * @swagger
 *
 * /superman/company/:companyId:
 *   delete:
 *     summary: Delete a company
 *     description: Delete a company and his associated advertissements
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete a company and his associated advertissements
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *     securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              in: header
 *              name: Authorization
 *              example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzA1MDk2LCJleHAiOjE2OTc3MDg2OTZ9.H2R1uOleYzo_hoHy9WSN2vUqXSfjCFrU-VC0JjUJKA4'
 */
