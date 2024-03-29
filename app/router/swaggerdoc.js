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
 * /search/{advertName}:
 *   get:
 *     summary: Search an advertissement by his name
 *     description: I want to search an advertissement by his name
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *          - name: advertName
 *            in: path
 *            description: Name of the advertissement
 *            required: true
 *     responses:
 *       200:
 *         description: I want to search an advertissement by his name
 *       500:
 *          description: Internal Server Error
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
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                          description: Title of the advert
 *                          example: "Développeur web"
 *                      description:
 *                          type: string
 *                          description: Description of the advert
 *                          example: "Développeur web JS"
 *                      place:
 *                          type: string
 *                          description: Place of the advert
 *                          example: "Nantes"
 *                      workingTime:
 *                          type: string
 *                          description: Working time of the advert
 *                          example: "Full-time"
 *                      expRequired:
 *                          type: string
 *                          description: Experience required for the advert
 *                          example: "Confirmé"
 *                      wages:
 *                          type: integer
 *                          description: Annual wages of the advert
 *                          example: 30000
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
 */
/**
 * @swagger
 *
 * /advert/{advertId}/save:
 *   post:
 *     summary: Update or Create an Job Information
 *     description: Check if the Job Information already exist, if exist, update it else create it
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *        - name: advertId
 *          in: path
 *          description: Id of the advertissement
 *          required: true
 *          schema:
 *              type: integer
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      isSaved:
 *                          type: boolean
 *                          description: If the advertissement is saved or not
 *                          example: true
 *                      isApplied:
 *                          type: boolean
 *                          description: If the advertissement is applied or not
 *                          example: false
 *     responses:
 *       200:
 *         description: Check if the Job Information already exist, if exist, update it else create it.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *        - name: advertId
 *          in: path
 *          description: Id of the advertissement
 *          required: true
 *          schema:
 *              type: integer
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      isSaved:
 *                          type: boolean
 *                          description: If the advertissement is saved or not
 *                          example: true
 *                      isApplied:
 *                          type: boolean
 *                          description: If the advertissement is applied or not
 *                          example: false
 *     responses:
 *       200:
 *         description: Check if the Job Information already exist, if exist, update it else create it.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *        - name: advertId
 *          in: path
 *          description: Id of the advertissement
 *          required: true
 *          schema:
 *              type: integer
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                          description: Title of the advert
 *                          example: "Développeur web"
 *                      description:
 *                          type: string
 *                          description: Description of the advert
 *                          example: "Développeur web JS"
 *                      place:
 *                          type: string
 *                          description: Place of the advert
 *                          example: "Nantes"
 *                      workingTime:
 *                          type: string
 *                          description: Working time of the advert
 *                          example: "Full-time"
 *                      expRequired:
 *                          type: string
 *                          description: Experience required for the advert
 *                          example: "Confirmé"
 *                      wages:
 *                          type: integer
 *                          description: Annual wages of the advert
 *                          example: 30000
 *     responses:
 *       200:
 *         description: As a company, I want to update an advert.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 *
 */
/**
 *  @swagger
 * /advert/{advertId}:
 *   delete:
 *     summary: Delete one advertissement
 *     description: As a company, I want to delete one advertissement
 *     tags: [Advertissements]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *        - name: advertId
 *          in: path
 *          description: Id of the advertissement
 *          required: true
 *          schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: As a company, I want to delete one advertissement.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      firstName:
 *                          type: string
 *                          description: First name of the user
 *                          example: "John"
 *                      lastName:
 *                          type: string
 *                          description: Last name of the user
 *                          example: "Doe"
 *                      email:
 *                          type: string
 *                          description: Email of the user
 *                          example: "john@gmail.com"
 *                      userPassword:
 *                          type: string
 *                          description: The password of the user
 *                          example: "azerty"
 *                      exp:
 *                          type: string
 *                          description: Experience of the user
 *                          example: "Confirmé"
 *                      school:
 *                          type: string
 *                          description: School of the user
 *                          example: "Epitech"
 *                      skills:
 *                          type: string
 *                          description: Skills of the user
 *                          example: "Developpment, Design"
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
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: Email of the user
 *                          example: "bob@gmail.com"
 *                      userPassword:
 *                          type: string
 *                          description: Password of the user
 *                          example: "azerty"
 *     responses:
 *       200:
 *         description: As a user, I want to access to my account.
 *       500:
 *         description: Error while logging in
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
 *     parameters:
 *          - name: userId
 *            in: path
 *            description: Id of the user
 *            required: true
 *     responses:
 *       200:
 *         description: Get the user's data.
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
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      firstName:
 *                          type: string
 *                          description: First name of the user
 *                          example: "John"
 *                      lastName:
 *                          type: string
 *                          description: Last name of the user
 *                          example: "Doe"
 *                      email:
 *                          type: string
 *                          description: Email of the user
 *                          example: "john@gmail.com"
 *                      exp:
 *                          type: string
 *                          description: Experience of the user
 *                          example: "Confirmé"
 *                      school:
 *                          type: string
 *                          description: School of the user
 *                          example: "Epitech"
 *                      skills:
 *                          type: string
 *                          description: Skills of the user
 *                          example: "Developpment, Design"
 *     responses:
 *       200:
 *         description: As a logged user, I want to update my data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *          description: Internal Server Error
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
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      userPassword:
 *                          type: string
 *                          description: The password of the user
 *                          example: "azerty"
 *     responses:
 *       200:
 *         description: As a logged user, I want to update my password
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *          - name: companyId
 *            in: path
 *            description: Id of the company
 *            required: true
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
 *     parameters:
 *          - name: companyId
 *            in: path
 *            description: Id of the company
 *            required: true
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          description: Name of the company
 *                          example: "Swagger"
 *                      logo:
 *                          type: string
 *                          description: Logo of the company
 *                          example: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png"
 *     responses:
 *       200:
 *         description: As a logged user, I want to create a company.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *          - name: companyId
 *            in: path
 *            description: Id of the company
 *            required: true
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          description: Name of the company
 *                          example: "Prisma"
 *                      logo:
 *                          type: string
 *                          description: Logo of the company
 *                          example: "https://res.cloudinary.com/practicaldev/image/fetch/s--6LfYwHeK--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/1608/0f93b179-76bf-4ee7-a838-e8222fbef062.png"
 *     responses:
 *       200:
 *         description: As a logged admin user of the current company, I want to udpate the company's data.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *          - name: companyId
 *            in: path
 *            description: Id of the company
 *            required: true
 *     responses:
 *       200:
 *         description: As a logged admin user of the current company, I want to delete my company.
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /search/{companyId}:
 *   get:
 *     summary: Search a company by his name
 *     description: I want to search a company by his name
 *     tags: [Company]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *          - name: companyName
 *            in: path
 *            description: Name of the company
 *            required: true
 *     responses:
 *       200:
 *         description: I want to search a company by his name
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *          - name: companyId
 *            in: path
 *            description: Id of the company
 *            required: true
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      firstName:
 *                          type: string
 *                          description: First name of the user
 *                          example: "John"
 *                      lastName:
 *                          type: string
 *                          description: Last name of the user
 *                          example: "Doe"
 *                      email:
 *                          type: string
 *                          description: Email of the user
 *                          example: "john@gmail.com"
 *                      exp:
 *                          type: string
 *                          description: Experience of the user
 *                          example: "Confirmé"
 *                      school:
 *                          type: string
 *                          description: School of the user
 *                          example: "Epitech"
 *                      skills:
 *                          type: string
 *                          description: Skills of the user
 *                          example: "Developpment, Design"
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
 */

/**
 * @swagger
 *
 *
 * /superman/applications/{advertId}:
 *   get:
 *     summary: Get all applications from one advetissement
 *     description: Get all applications with a pagination's system depending on the page and the limit from one advertissement
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *        - name: advertId
 *          in: path
 *          description: Id of the advertissement
 *          required: true
 *          schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: Get all applications with a pagination's system depending on the page and the limit from one advertissement
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *      - name: companyId
 *        in: path
 *        description: Id of the company
 *        required: true
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                          description: Title of the advert
 *                          example: "Développeur web"
 *                      description:
 *                          type: string
 *                          description: Description of the advert
 *                          example: "Développeur web JS"
 *                      place:
 *                          type: string
 *                          description: Place of the advert
 *                          example: "Nantes"
 *                      workingTime:
 *                          type: string
 *                          description: Working time of the advert
 *                          example: "Full-time"
 *                      expRequired:
 *                          type: string
 *                          description: Experience required for the advert
 *                          example: "Confirmé"
 *                      wages:
 *                          type: integer
 *                          description: Annual wages of the advert
 *                          example: 30000
 *     responses:
 *       200:
 *         description: Create an advertissement for a company
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 */
/**
 * @swagger
 *
 * /superman/user:
 *   post:
 *     summary: Create an user
 *     description: Create an user
 *     tags: [Superman]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      firstName:
 *                          type: string
 *                          description: First name of the user
 *                          example: "John"
 *                      lastName:
 *                          type: string
 *                          description: Last name of the user
 *                          example: "Doe"
 *                      email:
 *                          type: string
 *                          description: Email of the user
 *                          example: "john@gmail.com"
 *                      userPassword:
 *                          type: string
 *                          description: The password of the user
 *                          example: "azerty"
 *                      exp:
 *                          type: string
 *                          description: Experience of the user
 *                          example: "Confirmé"
 *                      school:
 *                          type: string
 *                          description: School of the user
 *                          example: "Epitech"
 *                      skills:
 *                          type: string
 *                          description: Skills of the user
 *                          example: "Developpment, Design"
 *     responses:
 *       200:
 *         description: Create an user
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      userId:
 *                          type: integer
 *                          description: Id of the user who is the admin of the company
 *                          example: 1
 *                      name:
 *                          type: string
 *                          description: Name of the company
 *                          example: "Swagger"
 *                      logo:
 *                          type: string
 *                          description: Logo of the company
 *                          example: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png"
 *     responses:
 *       200:
 *         description: Create a company for a user
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *        - name: advertId
 *          in: path
 *          description: Id of the advertissement
 *          required: true
 *          schema:
 *              type: integer
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                          description: Title of the advert
 *                          example: "Développeur web"
 *                      description:
 *                          type: string
 *                          description: Description of the advert
 *                          example: "Développeur web JS"
 *                      place:
 *                          type: string
 *                          description: Place of the advert
 *                          example: "Nantes"
 *                      workingTime:
 *                          type: string
 *                          description: Working time of the advert
 *                          example: "Full-time"
 *                      expRequired:
 *                          type: string
 *                          description: Experience required for the advert
 *                          example: "Confirmé"
 *                      wages:
 *                          type: integer
 *                          description: Annual wages of the advert
 *                          example: 30000
 *     responses:
 *       200:
 *         description: Update an advertissement for a company
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Id of the user
 *         required: true
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      firstName:
 *                          type: string
 *                          description: First name of the user
 *                          example: "John"
 *                      lastName:
 *                          type: string
 *                          description: Last name of the user
 *                          example: "Doe"
 *                      email:
 *                          type: string
 *                          description: Email of the user
 *                          example: "john@gmail.com"
 *                      exp:
 *                          type: string
 *                          description: Experience of the user
 *                          example: "Confirmé"
 *                      school:
 *                          type: string
 *                          description: School of the user
 *                          example: "Epitech"
 *                      skills:
 *                          type: string
 *                          description: Skills of the user
 *                          example: "Developpment, Design"
 *     responses:
 *       200:
 *         description: Update an user
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *       - name: advertId
 *         in: path
 *         description: Id of the advertissement
 *         required: true
 *     responses:
 *       200:
 *         description: Delete an advertissement for a company
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Id of the user
 *         required: true
 *     responses:
 *       200:
 *         description: Delete an user
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
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
 *     parameters:
 *       - name: companyId
 *         in: path
 *         description: Id of the company
 *         required: true
 *     responses:
 *       200:
 *         description: Delete a company and his associated advertissements
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal Server Error
 */

//! Models swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           description: ID de l'utilisateur
 *         LastName:
 *           type: string
 *           description: Nom de l'utilisateur
 *         firstName:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         email:
 *           type: string
 *           description: Email de l'utilisateur
 *         userPassword:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *         isAdmin:
 *           type: boolean
 *           description: Si l'utilisateur est admin ou non d'une entreprise
 *         exp:
 *           type: string
 *           description: Expérience de l'utilisateur
 *         school:
 *           type: string
 *           description: Formations de l'utilisateur
 *         skills:
 *           type: string
 *           description: Compétences de l'utilisateur
 *         isSuperman:
 *           type: boolean
 *           description: Si l'utilisateur est un superadmin ou non
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Companies:
 *       type: object
 *       properties:
 *         companyId:
 *           type: integer
 *           description: ID de l'entreprise
 *         name:
 *           type: string
 *           description: Nom de l'entreprise
 *         userId:
 *           type: integer
 *           description: ID de l'utilisateur qui est admin de l'entreprise
 *         logo:
 *           type: string
 *           description: Logo de l'entreprise
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Advertissements:
 *       type: object
 *       properties:
 *         advertissementId:
 *           type: integer
 *           description: ID de l'annonce
 *         title:
 *           type: string
 *           description: Titre de l'annonce
 *         description:
 *           type: string
 *           description: Description de l'annonce
 *         date:
 *           type: dateTime
 *           description: Date de mise en ligne de l'annonce
 *         companyId:
 *           type: integer
 *           description: ID de l'entreprise qui est propriétaire de l'annonce
 *         wages:
 *           type: integer
 *           description: Salaire annuel de l'annonce
 *         place:
 *           type: string
 *           description: Lieu de l'annonce
 *         WorkingTime:
 *           type: string
 *           description: Temps de travail de l'annonce
 *         expRequired:
 *           type: string
 *           description: Expérience requise pour l'annonce
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     JobInformation:
 *       type: object
 *       properties:
 *         isSaved:
 *           type: boolean
 *           description: Si l'annonce est sauvegardée ou non
 *         isApplied:
 *           type: boolean
 *           description: Si l'annonce est appliquée ou non
 *         advertissementId:
 *           type: integer
 *           description: ID de l'annonce concernée
 *         userId:
 *           type: integer
 *           description: ID de l'utilisateur concerné
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     ApplicationInformation:
 *       type: object
 *       properties:
 *         LastName:
 *           type: string
 *           description: Nom de l'utilisateur
 *         firstName:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         email:
 *           type: string
 *           description: Email de l'utilisateur
 *         userPassword:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *         exp:
 *           type: string
 *           description: Expérience de l'utilisateur
 *         school:
 *           type: string
 *           description: Formations de l'utilisateur
 *         skills:
 *           type: string
 *           description: Compétences de l'utilisateur
 *         applicationId:
 *           type: integer
 *           description: ID de la candidature
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Applications:
 *       type: object
 *       properties:
 *         applicationId:
 *           type: integer
 *           description: ID de la candidature
 *         userId:
 *           type: integer
 *           description: ID de l'utilisateur qui a postulé
 *         advertissementId:
 *           type: integer
 *           description: ID de l'annonce concernée
 *         date:
 *           type: dateTime
 *           description: Date de la candidature
 *         status:
 *           type: string
 *           description: Statut de la candidature
 */
