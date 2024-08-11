
// 1. Finding out how many users are active

[
  {$match: {
    isActive: true
  }}
]

// 2. What is the average age of the users?

  {
    $group: {
      _id: null,
      averageAge: {
        $avg: "$age"
      }
    }
  }


// 3. List top 5  favourite among the users

{
  $group: {
     _id: "$favoriteFruit",
     totalNumberofPeopleLovingThisFruit: {
       $sum: 1
     }
  }
}

// 4. Find total number of males and females

{
  $group: {
    _id: "$gender",
    count: {
      $sum: 1
    }
  }
}


// 5. Which country has the highest registered users
{
  $group: {
    _id: "$company.location.country",
    //I need to find total number of registered users in this country
    totalUsers: {
      $sum: 1
    }
  }
},
{
  $sort: {
    totalUsers: -1
  }
},
{
  $limit: 2
}


// 6. List all the unique eye colors present in the collection?

{
  $group: {
    _id: "$eyeColor",
    count: {
      $sum: 1
    }
  }
}


// 7. What is the average number of tags per user?

  {
    $unwind: {
      path: "$tags"
    }
  },
  {
    $group: {
      _id: "$_id",
      count: {
        $sum: 1
      }
    },
  },
  {
    $group: {
      _id: null,
      totalAverage: {
        $avg: "$count"
      }
    }
  }
// 8. How many people have enim tag. Tag is an array

  {
    $match: {
      tags: "enim"
    }
  },
  {
    $count: 'totalUsersWithEnimTag'
  }


// 9. Names and ages of users who are active and have tag sunt

    {
      $match: {
        isActive: true,
        tags: "sunt"
      }
    },
    {
      $project: {
        name: 1,
        age: 1
      }
    }

// 10. How many users have phone numbers starting from +1 (940)?

    {
      $match: {
        "company.phone": {
          $regex: "\\+1 \\(940\\)"
        }
      }
    },
    {
      $count: 'totalNumberofUsersWith940'
    }

// 11. List name and age of 3 recently regsitered users

    {
      $sort: {
        registered: -1
      }
    },
    {
      $limit: 3
    },
    {
      $project: {
        name: 1,
        age: 1
      }
    }

// 12. Categorise users by their favourite fruit. Also how many users are there in each group.

    {
      $group: {
        _id: "$favoriteFruit",
        users: {
          $push: "$name"
        }
      }
    }


// 14. Lookup Usecase: Connect Books and Authors collection

[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details"
    }
  }
]


