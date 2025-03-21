import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 模拟关注者数据
const followers = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "alice_j",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Frontend Developer | React Enthusiast",
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bob_smith",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Full Stack Developer | Node.js & React",
  },
  // 添加更多关注者...
]

export function UserFollowers({ username }: { username: string }) {
  return (
    <div className="space-y-6">
      {followers.map((follower) => (
        <Card key={follower.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={follower.avatar} alt={follower.name} />
                <AvatarFallback>{follower.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{follower.name}</h3>
                <p className="text-sm text-muted-foreground">@{follower.username}</p>
                <p className="mt-1 text-sm">{follower.bio}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              关注
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

