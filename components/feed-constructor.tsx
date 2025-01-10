"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RuleConstructor from "./rule-constructor";
import MultimediaOption from "./multimedia-option";
import { AnimatedListItem } from "./animated-list-item";
import { AnimatePresence } from "framer-motion";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export default function FeedConstructor() {
  const [feedName, setFeedName] = useState("");
  const [feedDescription, setFeedDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [rules, setRules] = useState([{ type: "keyword", value: "" }]);
  const [multimediaOptions, setMultimediaOptions] = useState({
    images: false,
    videos: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const addRule = () => {
    setRules([...rules, { type: "keyword", value: "" }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (
    index: number,
    newRule: { type: string; value: string },
  ) => {
    const newRules = [...rules];
    newRules[index] = newRule;
    setRules(newRules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log({
      feedName,
      feedDescription,
      isPublic,
      rules,
      multimediaOptions,
    });
    setIsSubmitting(false);
    toast({
      title: "Feed Created",
      description: `Your feed "${feedName}" has been created successfully.`,
    });
  };

  return (
    <ToastProvider>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <CardHeader>
            <CardTitle>Create a New Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feed-name">Feed Name</Label>
              <Input
                id="feed-name"
                value={feedName}
                onChange={(e) => setFeedName(e.target.value)}
                placeholder="My Awesome Feed"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feed-description">Feed Description</Label>
              <Textarea
                id="feed-description"
                value={feedDescription}
                onChange={(e) => setFeedDescription(e.target.value)}
                placeholder="Describe your feed..."
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="public-feed"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="public-feed">Make this feed public</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <CardHeader>
            <CardTitle>Feed Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence>
              {rules.map((rule, index) => (
                <AnimatedListItem key={index}>
                  <RuleConstructor
                    rule={rule}
                    onUpdate={(newRule) => updateRule(index, newRule)}
                    onRemove={() => removeRule(index)}
                  />
                </AnimatedListItem>
              ))}
            </AnimatePresence>
            <Button type="button" onClick={addRule} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Rule
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <CardHeader>
            <CardTitle>Multimedia Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MultimediaOption
              label="Include Images"
              checked={multimediaOptions.images}
              onChange={(checked) =>
                setMultimediaOptions({ ...multimediaOptions, images: checked })
              }
            />
            <MultimediaOption
              label="Include Videos"
              checked={multimediaOptions.videos}
              onChange={(checked) =>
                setMultimediaOptions({ ...multimediaOptions, videos: checked })
              }
            />
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Feed..." : "Create Feed"}
        </Button>
      </form>
      <ToastViewport />
    </ToastProvider>
  );
}
