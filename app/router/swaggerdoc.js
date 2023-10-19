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
 *
 *
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
 *     securityDefinitions:
 *          bearerAuth:
 *              type: apiKey
 *              name: Authorization
 *              in: header
 *     examples:
 *          'application/json':
 *             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjk3NjQxMzMwLCJleHAiOjE2OTc2NDQ5MzB9.cSwpCtnxhIhEKoFVwYc755QU9TvGi7FLxIxkOweVtlQ'
 *
 *
 * /appliedAdvert:
 *   get:
 *     summary: Get all applied advertisements from one user
 *     description: Retrieve a list of all applied adverts from one user
 *     tags: [Advertissements]
 *     responses:
 *       200:
 *         description: Retrieve a list of all applied adverts from one user.
 *
 *
 * /advert:
 *   post:
 *     summary: Create an advertissement
 *     description: As a company, I want to create an advert
 *     tags: [Advertissements]
 *     responses:
 *       200:
 *         description: As a company, I want to create an advert.
 *
 *
 *
 *
 * /advert/{advertId}/save:
 *   post:
 *     summary: Update or Create an Job Information
 *     description: Check if the Job Information already exist, if exist, update it else create it
 *     tags: [Advertissements]
 *     responses:
 *       200:
 *         description: Check if the Job Information already exist, if exist, update it else create it.
 *
 *
 *
 * /jobInformation/{advertId}:
 *   put:
 *     summary: Update or Create an Job Information
 *     description: Check if the Job Information already exist, if exist, update it else create it
 *     tags: [Advertissements]
 *     responses:
 *       200:
 *         description: Check if the Job Information already exist, if exist, update it else create it.
 *
 *
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
 *     responses:
 *       200:
 *         description: As a company, I want to update an advert.
 *
 *
 *
 *
 * /savedAdvert:
 *   delete:
 *     summary: Delete one advertissement
 *     description: As a company, I want to delete one advertissement
 *     tags: [Advertissements]
 *     responses:
 *       200:
 *         description: As a company, I want to delete one advertissement.
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
 *
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
 *
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
 *
 * /me:
 *   get:
 *     summary: Get my user's data
 *     description: As a logged user, I want to get my data
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: As a logged user, I want to get my data
 *
 *
 *
 * /user:
 *   put:
 *     summary: Update user's data
 *     description: As a logged user, I want to update my data
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: As a logged user, I want to update my data
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
 *
 * /company:
 *   post:
 *     summary: Create a company
 *     description: As a logged user, I want to create a company
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: As a logged user, I want to create a company.
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
 *     responses:
 *       200:
 *         description: As a logged admin user of the current company, I want to udpate the company's data.
 *
 */

/**
 * @swagger
 * /company/{companyId}:
 *   delete:
 *     summary: Delete company
 *     description: As a logged admin user of the current company, I want to delete my company
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: As a logged admin user of the current company, I want to delete my company.
 *
 *
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
 * /superman:
 *  get:
 *   summary: Get all superman's users
 *   description: Return if the current's user is a superman
 *   tags: [Superman]
 *   responses:
 *      200:
 *      description: Return if the current's user is a superman
 *
 *
 */

/**==========================================
 * Login a user
 *
 * @OA\Post(
 *     path="/api/login",
 *     tags={"Advertissements"},
 *     @OA\Response(
 *       response=404,
 *       description="These credentials do not match our records."
 *     ),
 *     @OA\Response(
 *       response=200,
 *       description="successful operation"
 *     ),
 *     @OA\Parameter(
 *         name="email",
 *         in="query",
 *         required=true,
 *         description="Write your email"
 *     ),
 *     @OA\Parameter(
 *         name="password",
 *         in="query",
 *         required=true,
 *         description="Write your password"
 *     ),
 *
 * )
 */
