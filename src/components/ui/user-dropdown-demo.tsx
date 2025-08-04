import { UserDropdown } from "@/components/ui/user-dropdown";

export default function UserDropdownDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <UserDropdown 
        user={{
          name: "John Doe",
          username: "@johndoe",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
          initials: "JD",
          status: "online"
        }}
        onAction={(action) => {
          console.log("Action clicked:", action);
          switch (action) {
            case "profile":
              alert("Profile clicked");
              break;
            case "upgrade":
              alert("Upgrade to Pro clicked");
              break;
            case "help":
              alert("Get help clicked");
              break;
            case "logout":
              alert("Logout clicked");
              break;
          }
        }}
      />
    </div>
  );
} 